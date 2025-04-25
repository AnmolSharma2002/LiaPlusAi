const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { encrypt, decrypt, generateRandomIV } = require("../utils/encryption");
const emailTemplate = require("../utils/emailVerificationTemplate");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate random IVs for encryption
    const iv_name = generateRandomIV();
    const iv_email = generateRandomIV();

    // Encrypt the username and email
    const encryptedUsername = encrypt(username, iv_name);
    const encryptedEmail = encrypt(email, iv_email);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token for email verification
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create new user
    const newUser = new User({
      username: encryptedUsername,
      iv_name: iv_name,
      email: encryptedEmail,
      iv_email: iv_email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiry: Date.now() + 3600000, // 1 hour expiry
    });

    await newUser.save();

    // Create the verification link
    const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${verificationToken}`;

    // Decrypt the username for personalization
    const decryptedUsername = decrypt(newUser.username, newUser.iv_name);

    // Create the email content using the template and pass the username
    const emailContent = emailTemplate(decryptedUsername, verificationLink);

    // Send the email with the verification link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: emailContent, // Use the personalized email template here
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({
        message:
          "Signup successful! Please check your email to verify your account.",
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check if email is verified
  if (!user.isVerified) {
    return res
      .status(400)
      .json({ message: "Please verify your email to login" });
  }

  // Decrypt the email for comparison if needed
  const decryptedEmail = decrypt(user.email, user.iv_email);

  // Compare passwords
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login successful", token });
};

module.exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Mark the user as verified
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  res.status(200).json({ message: "Email verified successfully!" });
};

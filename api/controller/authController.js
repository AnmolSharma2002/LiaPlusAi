const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");
const emailTemplate = require("../emailTemplate/emailTemplate");

let Resend;
let resend;

// Dynamically import 'resend' (since it's ESM-only)
(async () => {
  const resendModule = await import("resend");
  Resend = resendModule.Resend;
  resend = new Resend(process.env.RESEND_API_KEY);
})();

// Signup controller
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if resend is initialized
    if (!resend) {
      return res
        .status(500)
        .json({ errors: [{ msg: "Email service not initialized" }] });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      verificationToken,
    });
    await user.save();

    // Send verification email
    const verificationLink = `http://localhost:8000/api/auth/verify-email?token=${verificationToken}`;
    const { data, error } = await resend.emails.send({
      from: "RBAC Blog <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Email",
      html: emailTemplate({ name, verificationLink }),
    });

    if (error) {
      return res
        .status(500)
        .json({ errors: [{ msg: "Failed to send verification email" }] });
    }

    res
      .status(201)
      .json({ message: "User registered. Please verify your email." });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please verify your email first" }] });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Generate JWT
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token and user data
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// Verify email controller
module.exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid or expired verification token" }] });
    }

    // Update user
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to frontend login page
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  } catch (error) {
    console.error("Verify email error:", error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

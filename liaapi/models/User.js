const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Encrypted
  },
  iv_name: {
    type: String,
    required: true, // IV for encrypting the username
  },

  email: {
    type: String,
    required: true, // Encrypted
  },
  iv_email: {
    type: String,
    required: true, // IV for encrypting the email
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
  },

  verificationTokenExpiry: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

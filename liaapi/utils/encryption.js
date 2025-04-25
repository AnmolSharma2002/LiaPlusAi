const crypto = require("crypto");

// Utility function for encrypting text
const encrypt = (text, iv) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc", // Algorithm
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"), // Encryption key
    Buffer.from(iv, "hex") // IV (Initialization Vector)
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

// Utility function for decrypting text
const decrypt = (encryptedText, iv) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc", // Algorithm
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"), // Encryption key
    Buffer.from(iv, "hex") // IV (Initialization Vector)
  );

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

// Utility function to generate a random IV (Initialization Vector)
const generateRandomIV = () => {
  return crypto.randomBytes(16).toString("hex");
};

module.exports = { encrypt, decrypt, generateRandomIV };

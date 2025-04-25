const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; // Default to 8000 if PORT is not set

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    // MongoDB connection without deprecated options
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection Error", error);
    process.exit(1);
  }
};

connectDB();

app.use("/api", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

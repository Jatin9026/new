import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cors()); // Use cors middleware

// API Routes
app.use("/api/users", userRoutes);

// Basic route to check if backend is running
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test it: http://localhost:${PORT}`);
});
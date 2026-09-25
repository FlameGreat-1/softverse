import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import projectRoutes from "./routes/project";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Softverse backend is running." });
});

// Routes
app.use("/api/project", projectRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

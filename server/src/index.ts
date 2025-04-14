// src/index.ts

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";

import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import interviewRoutes from "./routes/interviewRoutes";
import questionRoutes from "./routes/questionRoutes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/questions", questionRoutes);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Root Route (to avoid "Cannot GET /")
app.get("/", (_req, res) => {
  res.send("Welcome to Interro API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

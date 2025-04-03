// src/server.ts
import express from "express";
import authRoutes from "./src/routes/authRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

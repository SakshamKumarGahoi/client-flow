import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import dashboardRoutes from "./routes/dashboard.js";
import authRoutes from "./routes/auth.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use("/api/dashboard", dashboardRoutes);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://client-flow-five.vercel.app", // later
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("ClientFlow backend running ✅");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Protected users route
app.get("/api/users", auth, async (req, res) => {
  const users = await prisma.user.findMany({
    select:
    { id: true, email: true , name: true, createdAt: true }
  });
  res.json(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/api/debug", (req, res) => {
  res.json({ message: "API routing works" });
});

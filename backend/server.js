import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import clientRoutes from "./routes/clients.js";
import dashboardRoutes from "./routes/dashboard.js";
import authRoutes from "./routes/auth.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

/* ✅ ALWAYS FIRST */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://client-flow-five.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/clients", clientRoutes);
/* Health */
app.get("/", (req, res) => {
  res.send("ClientFlow backend running ✅");
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* Protected users */
app.get("/api/users", auth, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true },
  });
  res.json(users);
});

app.get("/api/debug", (req, res) => {
  res.json({ message: "API routing works" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

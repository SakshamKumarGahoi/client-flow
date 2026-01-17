// routes/dashboard.js
import express from "express";
import auth from "../middleware/auth.js";
import prisma from "../prisma.js";

const router = express.Router();

router.get("/stats", auth, async (req, res) => {
  const userId = req.user.userId;

  const [clients, projects, invoices] = await Promise.all([
    prisma.client.count({ where: { userId } }),
    prisma.project.count({ where: { userId } }),
    prisma.invoice.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
  ]);

  res.json({
    clients,
    projects,
    revenue: invoices._sum.amount || 0,
  });
});

export default router;

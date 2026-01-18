import express from "express";
import auth from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/stats", auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const clients = await prisma.client.count({
      where: { userId },
    });

    const projects = await prisma.project.count({
      where: {
        client: { userId },
      },
    });

    const revenueAgg = await prisma.invoice.aggregate({
      where: {
        project: {
          client: { userId },
        },
      },
      _sum: { amount: true },
    });

    res.json({
      clients,
      projects,
      revenue: revenueAgg._sum.amount || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard stats failed" });
  }
});

export default router;

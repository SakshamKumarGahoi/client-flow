import express from "express";
import auth from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/stats", auth, async (req, res) => {
  try {
    const userId = req.user.id; // from your fixed auth middleware

    // 1. Clients owned by user
    const clientsCount = await prisma.client.count({
      where: {
        userId,
      },
    });

    // 2. Projects via client → user
    const projectsCount = await prisma.project.count({
      where: {
        client: {
          userId,
        },
      },
    });

    // 3. Revenue via invoice → project → client → user
    const invoicesSum = await prisma.invoice.aggregate({
      where: {
        project: {
          client: {
            userId,
          },
        },
      },
      _sum: {
        amount: true,
      },
    });

    res.json({
      clients: clientsCount,
      projects: projectsCount,
      revenue: invoicesSum._sum.amount ?? 0,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

export default router;

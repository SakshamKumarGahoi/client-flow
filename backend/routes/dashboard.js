import express from "express";
import auth from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/stats", auth, async (req, res) => {
  const userId = req.userId;

  const clientsCount = await prisma.client.count({
    where: { userId },
  });

  const projectsCount = await prisma.project.count({
    where: {
      client: {
        userId,
      },
    },
  });

  const invoicesSum = await prisma.invoice.aggregate({
    where: {
      client: {
        userId,
      },
    },
    _sum: { amount: true },
  });

  res.json({
    clients: clientsCount,
    projects: projectsCount,
    revenue: invoicesSum._sum.amount || 0,
  });
});


export default router;
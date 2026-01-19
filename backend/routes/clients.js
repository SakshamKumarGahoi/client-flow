import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * CREATE CLIENT
 */
router.post("/", auth, async (req, res) => {
  const { companyName, contactPerson, email, phone } = req.body;

  try {
    const client = await prisma.client.create({
      data: {
        companyName,
        contactPerson,
        email,
        phone,
        userId: req.user.userId,
      },
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET ALL CLIENTS (user-scoped)
 */
router.get("/", auth, async (req, res) => {
  const clients = await prisma.client.findMany({
    where: {
      userId: req.user.userId,
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(clients);
});

/**
 * GET SINGLE CLIENT
 */
router.get("/:id", auth, async (req, res) => {
  const client = await prisma.client.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.userId,
    },
  });

  if (!client) return res.sendStatus(404);
  res.json(client);
});

/**
 * UPDATE CLIENT
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const client = await prisma.client.updateMany({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
      data: req.body,
    });

    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE CLIENT
 */
router.delete("/:id", auth, async (req, res) => {
  await prisma.client.deleteMany({
    where: {
      id: req.params.id,
      userId: req.user.userId,
    },
  });

  res.sendStatus(204);
});

export default router;

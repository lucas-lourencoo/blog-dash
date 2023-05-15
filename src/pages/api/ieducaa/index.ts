import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {
      const post = await prisma.postsIeducaa.create({ data: req.body });

      return res.json(post);
    } catch (err) {
      return res.status(500).json({ message: "Um erro inesperado aconteceu." });
    }
  }

  if (req.method === "GET") {
    try {
      const posts = await prisma.postsIeducaa.findMany({});

      return res.json(posts);
    } catch (err) {
      return res.status(500).json({ message: "Um erro inesperado aconteceu." });
    }
  }

  return res.status(401);
}

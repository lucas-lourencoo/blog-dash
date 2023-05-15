import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "DELETE") {
    try {
      const posts = await prisma.postsIaa.delete({
        where: {
          id: req.query.postId?.toString()!,
        },
      });

      return res.json(posts);
    } catch (err) {
      return res.status(500).json({ message: "Um erro inesperado aconteceu." });
    }
  }

  return res.status(401);
}

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sessionToken } = req.body;

  const ret = await prisma.session.findUnique({ where: { sessionToken } });
  if (!ret) throw new Error("Cannot find token.");

  res.status(200).json(ret);
}

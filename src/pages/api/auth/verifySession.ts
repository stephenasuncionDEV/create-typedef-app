import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sessionToken } = req.body;

  const ret = await prisma.session.findUnique({ where: { sessionToken } });

  res.status(200).json(ret);
}

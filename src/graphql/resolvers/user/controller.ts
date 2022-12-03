/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prismadb";

export const getUserByID = async (parent: any, args: any) => {
  try {
    const { id } = args;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { accounts: true, sessions: true },
    });
    if (!user) throw new Error("Cannot find user.");

    console.log("user", user);

    return user;
  } catch (err: any) {
    throw Error(err);
  }
};

export const getUserByEmail = async (parent: any, args: any) => {
  try {
    const { email } = args;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true, sessions: true },
    });
    if (!user) throw new Error("Cannot find user.");

    return user;
  } catch (err: any) {
    throw Error(err);
  }
};

// import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../header";
import { z } from "zod";

export const userRouter = router({
  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }).nullish())
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input?.id },
      });
    }),
  deleteUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.delete({
        where: { id: input?.id },
      });
    }),
});

export type UserRouter = typeof userRouter;

// import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../header";
import { z } from "zod";

export const userRouter = router({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  getUserForce: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  deleteUser: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.delete({
      where: { id: ctx.session.user.id },
    });
  }),
  updateName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.name },
      });
    }),
  updateEmail: protectedProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.count({
        where: {
          email: input.email,
        },
      });

      if (user > 0) {
        throw new Error("Email is already connected to an account.");
      }

      return await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { email: input.email },
      });
    }),
  addPoints: protectedProcedure
    .input(z.object({ value: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { points: { increment: input.value } },
      });
    }),
  removePoints: protectedProcedure
    .input(z.object({ value: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { points: { decrement: input.value } },
      });
    }),
});

export type UserRouter = typeof userRouter;

import { router, protectedProcedure } from "../header";
import { z } from "zod";

export const paymentRouter = router({
  getPayments: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { payments: true },
    });
  }),
  addPayment: protectedProcedure
    .input(
      z.object({
        hash: z.string(),
        amount: z.number(),
        price: z.string(),
        method: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.payment.create({
        data: {
          userId: ctx.session.user.id,
          hash: input.hash,
          amount: input.amount,
          price: input.price,
          method: input.method,
        },
      });
    }),
});

export type PaymentRouter = typeof paymentRouter;

import { router } from "../header";
import { userRouter } from "./user";
import { paymentRouter } from "./payment";

export const appRouter = router({
  user: userRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;

import { configureStore } from "@reduxjs/toolkit";
import { exampleSlice } from "./example";

const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

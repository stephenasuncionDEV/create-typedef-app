import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const exampleSlice = createSlice({
  name: "example",
  initialState: {
    text: "",
  },
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { update } = exampleSlice.actions;
export default exampleSlice.reducer;

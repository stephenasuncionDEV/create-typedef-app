import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isUserSettingsOpen: boolean;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserSettingsOpen: false,
  } as UserState,
  reducers: {
    updateIsUserSettingsOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserSettingsOpen = action.payload;
    },
  },
});

export const { updateIsUserSettingsOpen } = userSlice.actions;
export default userSlice.reducer;

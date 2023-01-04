import type { PayloadAction } from "@reduxjs/toolkit";
import { Prisma } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export type UserFullType = Prisma.UserGetPayload<{
  select: { [K in keyof Required<Prisma.UserSelect>]: true };
}>;

export interface UserState {
  user: UserFullType;
  isUserSettingsOpen: boolean;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as UserFullType,
    isUserSettingsOpen: false,
  } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserFullType>) => {
      state.user = action.payload;
    },
    setIsUserSettingsOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserSettingsOpen = action.payload;
    },
  },
});

export const { setUser, setIsUserSettingsOpen } = userSlice.actions;
export default userSlice.reducer;

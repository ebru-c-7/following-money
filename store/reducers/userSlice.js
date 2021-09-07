import { createSlice } from "@reduxjs/toolkit";
import { signIn, signOut } from "next-auth/client";

const initialState = {
  userId: null,
  userEmail: null,
  userName: null,
  image: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.image = action.payload.image;
    },
    // sigup: (state) => {},
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = null;
      state.userEmail = null;
      state.image = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

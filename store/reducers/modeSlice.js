import { createSlice } from "@reduxjs/toolkit";

import { DARK_MODE, LIGHT_MODE } from "./index";

const initialState = {
  mode: DARK_MODE,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    fetchMode: (state) => {
      const storedMode = localStorage.getItem("mode");
      if (storedMode) state.mode = storedMode;
    },
    changeMode: (state) => {
      const mode = state.mode === DARK_MODE ? LIGHT_MODE : DARK_MODE;
      localStorage.setItem("mode", mode);
      state.mode = mode;
    },
  },
});

export const { fetchMode, changeMode } = modeSlice.actions;

export default modeSlice.reducer;

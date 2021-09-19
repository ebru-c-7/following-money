import { configureStore } from "@reduxjs/toolkit";

import modeReducer from "./reducers/modeSlice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
  },
});

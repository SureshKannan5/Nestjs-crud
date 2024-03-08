import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/baseApiSetup";
import { setupListeners } from "@reduxjs/toolkit/query";
import canvasSlice from "./slices/canvas.slice";

export const store = configureStore({
  reducer: {
    canvasState: canvasSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

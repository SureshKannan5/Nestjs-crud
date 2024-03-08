import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRow: {},
  refreshPage: false,
  isOpen: false,
  title: "",
};

const canvasSlice = createSlice({
  name: "canvasState",
  initialState: {
    canvasInfo: initialState,
  },
  reducers: {
    setCanvasInfo: {
      reducer: (state, action) => {
        state.canvasInfo = action.payload;
      },
      prepare(oldData, changedData) {
        return {
          payload: { ...oldData, ...changedData },
        };
      },
    },
  },
});

export const { setCanvasInfo } = canvasSlice.actions;

export const getCanvasInfo = (state) => state.canvasState.canvasInfo;

export default canvasSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    error: false,
    message: "",
  },
  reducers: {
    setProps: (state, payload) => {
      state[payload.props] = payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProps } = global.actions;

export default global.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const index = createSlice({
  name: "index",
  initialState: {
    error: false,
  },
  reducers: {
    setProps: (state, payload) => {
      state[payload.props] = payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProps } = index.actions;

export default index.reducer;

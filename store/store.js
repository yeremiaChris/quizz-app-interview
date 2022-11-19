import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./index";
export default configureStore({
  reducer: {
    global: globalReducer,
  },
});

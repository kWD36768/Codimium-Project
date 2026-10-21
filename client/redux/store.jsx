import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./leadSlice";

const store = configureStore({
  reducer: {
    leads: leadReducer
  }
});

export default store;



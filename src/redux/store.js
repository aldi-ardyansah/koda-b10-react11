import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/charactersSlice";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

export default store;
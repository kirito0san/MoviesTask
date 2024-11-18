import { configureStore } from "@reduxjs/toolkit";
import MoviesSlice from "../slices/movies/MoviesSlice";
export const store = configureStore({
  reducer: {
    movies: MoviesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import MoviesSlice from "../features/Movies/MoviesSlice";
import movieSlice from "../features/MovieDetails/movieSlice";
import similarMoviesSlice from "../features/MovieDetails/similarMovies/similarMoviesSlice";
export const store = configureStore({
  reducer: {
    movies: MoviesSlice,
    MovieDetail: movieSlice,
    similar: similarMoviesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

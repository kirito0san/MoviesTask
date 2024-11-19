import { createSlice } from "@reduxjs/toolkit";
import { MoviesState } from "@/types/types";
import { AllMoviesHandler } from "./allMovies";
import { searchMoviesHandler } from "./searchMovies";
import { oneMovieHandler } from "./oneMovie";
import { similarMoviesHandler } from "./similarMovies";

const initialState: MoviesState = {
  allMovies: {
    loading: true,
    error: null,
    meta: null,
    movies: [],
  },
  movie: {
    movie: {},
    loading: true,
    error: null,
  },
  similarMovies: {
    loading: true,
    error: null,
    similarMovies: [],
    totalPages: null,
  },
};
const Movies = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    pageChange: (state, action) => {
      if (state.allMovies.meta) {
        state.allMovies.meta.page = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    AllMoviesHandler(builder);
    searchMoviesHandler(builder);
    oneMovieHandler(builder);
    similarMoviesHandler(builder);
  },
});
export default Movies.reducer;
export const { pageChange } = Movies.actions;

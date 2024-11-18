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
    meta: { page: 1, total_pages: 1, total_results: 0 },
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
    totalPages: 1,
  },
};
const Movies = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    pageChange: (state, action) => {
      state.allMovies.meta.page = action.payload;
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

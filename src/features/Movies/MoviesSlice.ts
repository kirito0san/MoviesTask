import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("/fetchMovies", async (page: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDNjZjI0NDU0MDU2MWQxOWE3ZjFiNGJlZjdiM2MyYiIsIm5iZiI6MTczMDk2ODI0OC42NTg2MTU0LCJzdWIiOiI2NTdkZTA1MTVmMmRiMTA2YjZkZGRlZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hqUNYo_EV6XLpySmyyA-Yj4IA8EZYLfjf6Ok6yuAt54`,
      },
    }
  );
  return response.data;
});
export interface movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[]; // Array of genre IDs
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // Date as a string, e.g., "2024-10-09"
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface MoviesState {
  movies: movie[];
  currentPage: number;
  totalPages: number;
  status: "idle" | "succeeded" | "loading" | "failed";
  error: null | string;
}
const initialState: MoviesState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
  status: "idle",
  error: null,
};
const Movies = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    pageChange: (state, action) => {
      console.log(action.payload);

      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});
export default Movies.reducer;
export const { pageChange } = Movies.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("/fetchMovies", async (page: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?include_adult=false&api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDNjZjI0NDU0MDU2MWQxOWE3ZjFiNGJlZjdiM2MyYiIsIm5iZiI6MTczMDk2ODI0OC42NTg2MTU0LCJzdWIiOiI2NTdkZTA1MTVmMmRiMTA2YjZkZGRlZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hqUNYo_EV6XLpySmyyA-Yj4IA8EZYLfjf6Ok6yuAt54`,
      },
    }
  );
  return response.data;
});
export const fetchSearchMovies = createAsyncThunk(
  "/fetchSearchMovies",
  async ({ query, page }: { query: string; page: number }) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        api_key: "4e44d9029b1270a757cddc766a1bcb63",
        page: page,
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDNjZjI0NDU0MDU2MWQxOWE3ZjFiNGJlZjdiM2MyYiIsIm5iZiI6MTczMDk2ODI0OC42NTg2MTU0LCJzdWIiOiI2NTdkZTA1MTVmMmRiMTA2YjZkZGRlZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hqUNYo_EV6XLpySmyyA-Yj4IA8EZYLfjf6Ok6yuAt54`,
      },
    });
    return response.data;
  }
);
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
  search: string;
  status: "idle" | "succeeded" | "loading" | "failed";
  error: null | string;
  meta: { page: number; total_pages: number; total_results: number } | null;
}
const initialState: MoviesState = {
  movies: [],
  search: "",
  meta: null,
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
      state.currentPage = action.payload;
    },
    searchChange: (state, action) => {
      state.search = action.payload;
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
    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        const { results, ...rest } = action.payload;
        state.status = "succeeded";
        state.meta = rest;
        state.currentPage = action.payload.page;
        state.movies = results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});
export default Movies.reducer;
export const { pageChange, searchChange } = Movies.actions;

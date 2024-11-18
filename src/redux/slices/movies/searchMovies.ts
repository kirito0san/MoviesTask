import { mainUrl } from "@/redux/api";
import { MoviesState } from "@/types/types";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchMovies = createAsyncThunk(
  "/fetchSearchMovies",
  async ({ query, page }: { query: string; page: number }) => {
    const response = await axios.get(`${mainUrl}/search/movie`, {
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
export const searchMoviesHandler = (builder: ActionReducerMapBuilder<MoviesState>) => {
  builder
    .addCase(fetchSearchMovies.pending, (state) => {
      state.allMovies.loading = true;
      state.allMovies.error = null;
    })
    .addCase(fetchSearchMovies.fulfilled, (state, action) => {
      state.allMovies.loading = false;
      const { results, ...rest } = action.payload;
      state.allMovies.meta = rest;
      state.allMovies.movies = results;
      state.allMovies.meta.page = action.payload.page;
      state.allMovies.meta.total_pages = action.payload.total_pages;
    })
    .addCase(fetchSearchMovies.rejected, (state, action) => {
      state.allMovies.loading = false;
      state.allMovies.error = action.error.message || "Failed to fetch movies";
    });
};

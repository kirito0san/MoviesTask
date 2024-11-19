import { authorization, mainUrl } from "@/redux/api";
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
        Authorization: authorization,
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
    })
    .addCase(fetchSearchMovies.rejected, (state, action) => {
      state.allMovies.loading = false;
      state.allMovies.error = action.error.message || "Failed to fetch movies";
    });
};

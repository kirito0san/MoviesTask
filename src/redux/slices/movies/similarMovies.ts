import { authorization, mainUrl } from "@/redux/api";
import { MoviesState } from "@/types/types";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSimilarMovies = createAsyncThunk(
  "/fetchSimilarMovies",
  async (movieId: number) => {
    const response = await axios.get(`${mainUrl}/movie/${movieId}/similar?language=en-US&page=1`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    return response.data.results;
  }
);
export const similarMoviesHandler = (builder: ActionReducerMapBuilder<MoviesState>) => {
  builder

    .addCase(fetchSimilarMovies.pending, (state) => {
      state.similarMovies.loading = true;
    })
    .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
      state.similarMovies.loading = false;
      state.similarMovies.similarMovies = action.payload;
    })
    .addCase(fetchSimilarMovies.rejected, (state, action) => {
      state.similarMovies.loading = false;
      state.similarMovies.error = action.error.message || "Failed to fetch similar movies";
    });
};

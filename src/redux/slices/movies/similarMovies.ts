import { mainUrl } from "@/redux/api";
import { MoviesState } from "@/types/types";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSimilarMovies = createAsyncThunk(
  "/fetchSimilarMovies",
  async (movieId: number) => {
    const response = await axios.get(`${mainUrl}/movie/${movieId}/similar?language=en-US&page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDNjZjI0NDU0MDU2MWQxOWE3ZjFiNGJlZjdiM2MyYiIsIm5iZiI6MTczMDk2ODI0OC42NTg2MTU0LCJzdWIiOiI2NTdkZTA1MTVmMmRiMTA2YjZkZGRlZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hqUNYo_EV6XLpySmyyA-Yj4IA8EZYLfjf6Ok6yuAt54`,
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

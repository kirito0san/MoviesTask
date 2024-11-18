import { mainUrl } from "@/redux/api";
import { MoviesState } from "@/types/types";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllMovies = createAsyncThunk("/fetchAllMovies", async (page: number) => {
  const response = await axios.get(
    `${mainUrl}/movie/popular?include_adult=false&api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDNjZjI0NDU0MDU2MWQxOWE3ZjFiNGJlZjdiM2MyYiIsIm5iZiI6MTczMDk2ODI0OC42NTg2MTU0LCJzdWIiOiI2NTdkZTA1MTVmMmRiMTA2YjZkZGRlZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hqUNYo_EV6XLpySmyyA-Yj4IA8EZYLfjf6Ok6yuAt54`,
      },
    }
  );
  return response.data;
});
export const AllMoviesHandler = (builder: ActionReducerMapBuilder<MoviesState>) => {
  builder
    .addCase(fetchAllMovies.pending, (state) => {
      state.allMovies.loading = true;
      state.allMovies.error = null;
    })
    .addCase(fetchAllMovies.fulfilled, (state, action) => {
      const { results, ...rest } = action.payload;
      state.allMovies.loading = false;
      state.allMovies.meta = rest;
      state.allMovies.movies = results;
    })
    .addCase(fetchAllMovies.rejected, (state, action) => {
      state.allMovies.loading = false;
      state.allMovies.error = action.error.message || "Failed to fetch movies";
    });
};

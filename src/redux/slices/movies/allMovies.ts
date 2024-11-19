import { authorization, mainUrl } from "@/redux/api";
import { MoviesState } from "@/types/types";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllMovies = createAsyncThunk("/fetchAllMovies", async (page: number) => {
  const response = await axios.get(
    `${mainUrl}/movie/popular?include_adult=false&api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: authorization,
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

import { authorization, mainUrl } from "@/redux/api";
import { MoviesState } from "@/types/types";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOneMovie = createAsyncThunk("/fetchOneMovie", async (id: number) => {
  const response = await axios.get(
    `${mainUrl}/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    }
  );
  return response.data;
});
export const oneMovieHandler = (builder: ActionReducerMapBuilder<MoviesState>) => {
  builder
    .addCase(fetchOneMovie.pending, (state) => {
      state.movie.loading = true;
      state.movie.error = null;
    })
    .addCase(fetchOneMovie.fulfilled, (state, action) => {
      state.movie.loading = false;
      state.movie.movie = action.payload;
    })
    .addCase(fetchOneMovie.rejected, (state, action) => {
      state.movie.loading = false;
      state.movie.error = action.error.message || "Failed to fetch movies";
    });
};

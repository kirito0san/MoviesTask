import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}
const initialState = {
  similarMovies: [] as movie[],
  loading: false,
  error: null as string | null,
};

export const fetchSimilarMovies = createAsyncThunk(
  "movie/fetchSimilarMovies",
  async (movieId: number) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDNjZjI0NDU0MDU2MWQxOWE3ZjFiNGJlZjdiM2MyYiIsIm5iZiI6MTczMDk2ODI0OC42NTg2MTU0LCJzdWIiOiI2NTdkZTA1MTVmMmRiMTA2YjZkZGRlZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hqUNYo_EV6XLpySmyyA-Yj4IA8EZYLfjf6Ok6yuAt54`,
        },
      }
    );
    return response.data.results;
  }
);

const movieSimilarSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.similarMovies = action.payload; // Set similar movies
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch similar movies";
      });
  },
});

export default movieSimilarSlice.reducer;

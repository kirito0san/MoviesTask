import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}
interface MovieDetail {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: BelongsToCollection | null;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export const fetchMovie = createAsyncThunk("/fetchMovie", async (id: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDNjZjI0NDU0MDU2MWQxOWE3ZjFiNGJlZjdiM2MyYiIsIm5iZiI6MTczMDk2ODI0OC42NTg2MTU0LCJzdWIiOiI2NTdkZTA1MTVmMmRiMTA2YjZkZGRlZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hqUNYo_EV6XLpySmyyA-Yj4IA8EZYLfjf6Ok6yuAt54`,
      },
    }
  );
  return response.data;
});

interface MovieState {
  movie: MovieDetail;
  status: "idle" | "succeeded" | "loading" | "failed";
  error: null | string;
}
const initialState: MovieState = {
  movie: {},
  status: "idle",
  error: null,
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});
export default movieSlice.reducer;

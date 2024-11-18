/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}
export interface MovieDetail {
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
export interface dataOneMovie {
  movie: MovieDetail;
  loading: boolean;
  error: null | string;
}
export interface MoviesState {
  similarMovies: similarMovies;
  allMovies: allMovies;
  movie: dataOneMovie;
}
// MovieDetail
// fix

export interface similarMovies {
  loading: boolean;
  similarMovies: movie[];
  error: string | null;
  totalPages: number;
}
export interface allMovies {
  loading: boolean;
  meta: { page: number; total_pages: number; total_results: number };
  error: string | null;
  movies: movie[];
}

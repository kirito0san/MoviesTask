import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, movie } from "./MoviesSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { PaginationDemo } from "../../components/Pagination";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const status = useSelector((state: RootState) => state.movies.status);
  const currentPage = useSelector((state: RootState) => state.movies.currentPage);
  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);
  if (status == "loading") return <div>loading</div>;
  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {movies.map((movie: movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="bg-main-bg  md:w-[45%] rounded-lg overflow-hidden lg:w-[30%]"
        >
          <img
            className="w-full h-[250px] md:h-[300px]"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={movie.title}
          />
          <div className="p-5">
            <p className="mb-3 text-2xl font-bold">{movie.title}</p>
            <p className="truncated-text">{movie.overview}</p>
          </div>
        </Link>
      ))}
      <PaginationDemo />
    </div>
  );
}

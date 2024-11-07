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
    <div className="grid grid-cols-1 gap-4 justify-between md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie: movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="overflow-hidden rounded-lg bg-main-bg hover:bg-[#dbd9d9] duration-300"
        >
          <div className="p-2">
            <img
              className="mx-auto w-[300px] object-cover h-[400px]"
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt={movie.title}
            />
          </div>

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

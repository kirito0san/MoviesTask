import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchSearchMovies, movie, pageChange, searchChange } from "./MoviesSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { PaginationDemo } from "../../components/Pagination";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    status,
    currentPage,
    meta,
    search: searchInput,
  } = useSelector((state: RootState) => state.movies);
  console.log(movies);
  console.log(meta);

  const search = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  const handleSearch = () => {
    if (search.current) {
      console.log("happen");
      const query = search.current.value;
      dispatch(searchChange(query));
      if (query) {
        dispatch(fetchSearchMovies({ query, page: 1 }));
        dispatch(pageChange(1));
      }
    }
    if (search.current && search.current.value === "") {
      dispatch(pageChange(1));
    }
  };
  useEffect(() => {
    if (search.current && search.current.value && searchInput !== "") {
      const query = search.current.value;
      dispatch(fetchSearchMovies({ query, page: currentPage }));
    } else {
      dispatch(fetchMovies(currentPage));
    }
  }, [dispatch, currentPage, searchInput]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-btn-bg"
          type="text"
          ref={search}
          placeholder="Search for movies..."
        />
        <button
          onClick={() => handleSearch()}
          className="p-2 text-white bg-btn-bg rounded-lg transition duration-200 hover:bg-[#ffffff] hover:text-btn-bg"
        >
          Search
        </button>
      </div>
      {status == "loading" ? (
        <div className="text-center">loading</div>
      ) : movies.length < 1 ? (
        <div className="text-center">no movies</div>
      ) : (
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
                <p className="mb-3 text-2xl font-bold truncated-text">{movie.title}</p>
                <p className="truncated-text">{movie.overview}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="md:w-[350px]  mx-auto">
        {meta && meta.total_pages < 20 ? "" : <PaginationDemo />}
      </div>
    </div>
  );
}

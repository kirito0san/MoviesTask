import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { movie } from "@/types/types";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchSearchMovies } from "@/redux/slices/movies/searchMovies";
import { fetchAllMovies } from "@/redux/slices/movies/allMovies";
import ReactPaginate from "react-paginate";
export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, meta } = useSelector((state: RootState) => state.movies.allMovies);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const handleSearch = () => {
    if (searchInput.current) {
      const query = searchInput.current.value;
      if (query) {
        dispatch(fetchSearchMovies({ query, page: 1 }));
      } else {
        dispatch(fetchAllMovies(1));
      }
    }
  };
  const handlePage = (page: number) => {
    if (searchInput.current) {
      const query = searchInput.current.value;
      if (query) {
        dispatch(fetchSearchMovies({ query, page: page + 1 }));
      } else {
        dispatch(fetchAllMovies(page + 1));
      }
    }
  };
  useEffect(() => {
    dispatch(fetchAllMovies(1));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <input
          ref={searchInput}
          className="p-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-btn-bg"
          type="text"
          placeholder="Search for movies..."
        />
        <button
          onClick={() => handleSearch()}
          className="p-2 text-white bg-btn-bg rounded-lg transition duration-200 hover:bg-[#ffffff] hover:text-btn-bg"
        >
          Search
        </button>
      </div>
      {loading ? (
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
        {meta && meta.total_pages && meta.total_pages <= 1 ? (
          ""
        ) : (
          <ReactPaginate
            className="flex items-center justify-center gap-1 py-0 md:gap-2 md:p-4"
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeLinkClassName="!bg-btn-bg text-white"
            previousLinkClassName="p-[3px] duration-300 border border-header bg-pagination  text-header text-center rounded-md hover:bg-btn-bg text-white hover:text-pagination text-xs md:text-xl"
            nextLinkClassName="p-[3px] duration-300 border  border-header bg-pagination  text-header text-center rounded-md hover:bg-btn-bg text-white hover:text-pagination text-xs md:text-xl"
            pageLinkClassName="p-[3px] hover:text-white bg-white duration-300 border border-header  md:min-w-[2.5rem] bg-pagination  text-header text-center rounded-md hover:bg-btn-bg hover:text-pagination inline-block text-xs md:text-xl"
            pageCount={meta?.total_pages ?? 1 > 500 ? 500 : meta?.total_pages ?? 1}
            onPageChange={({ selected }) => handlePage(selected)}
            forcePage={(meta?.page ?? 1) - 1}
          />
        )}
      </div>
    </div>
  );
}

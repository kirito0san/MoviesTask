import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { fetchMovie } from "./movieSlice";
import Similar from "./similarMovies/Similar";

export default function ProductsDetails() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector((state: RootState) => state.MovieDetail.movie);
  useEffect(() => {
    dispatch(fetchMovie(Number(id)));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  return (
    <>
      <div className="flex overflow-hidden flex-col gap-4 rounded-lg xl:flex-row bg-main-bg">
        <div>
          <img
            className=" object-cover mx-auto w-[300px]  h-[400px]"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={movie.title}
          />
        </div>
        <div className="flex flex-col gap-5 p-5 md:gap-10 lg:justify-center">
          <p className="mb-3 text-2xl font-bold md:text-4xl">{movie.title}</p>
          <p className="md:text-2xl">{movie.overview}</p>
          <div className="flex gap-3">
            <Link
              to="/"
              className="block justify-self-center p-2 font-bold text-white rounded-lg transition-colors duration-300 w-fit hover:bg-main-bg hover:text-btn-bg hover:outline hover:outline-1 bg-btn-bg"
            >
              Back to Home
            </Link>
            {movie.homepage && movie.homepage.length > 0 && (
              <Link
                to={movie.homepage || "/"}
                className="block justify-self-center p-2 font-bold text-white rounded-lg transition-colors duration-300 w-fit hover:bg-main-bg hover:text-btn-bg hover:outline hover:outline-1 bg-btn-bg"
              >
                View Movie
              </Link>
            )}
          </div>
        </div>
      </div>
      <Similar />
    </>
  );
}

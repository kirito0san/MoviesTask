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
      <div className="flex gap-4  flex-col lg:flex-row bg-main-bg rounded-lg">
        <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
        <div className="p-5 flex lg:justify-center gap-5 flex-col">
          <p className="text-2xl mb-3 font-bold">{movie.title}</p>
          <p className="">{movie.overview}</p>
          <div className="flex gap-3">
            <Link
              to="/"
              className="block w-fit justify-self-center hover:bg-main-bg hover:text-btn-bg hover:outline hover:outline-1 transition-colors   font-bold duration-300  bg-btn-bg text-white p-2 rounded-lg"
            >
              Back to Home
            </Link>
            {movie.homepage && movie.homepage.length > 0 && (
              <Link
                to={movie.homepage || "/"}
                className="block w-fit justify-self-center hover:bg-main-bg hover:text-btn-bg hover:outline hover:outline-1 transition-colors   font-bold duration-300  bg-btn-bg text-white p-2 rounded-lg"
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

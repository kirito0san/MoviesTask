import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchSimilarMovies } from "./similarMoviesSlice";
import { Link, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Similar() {
  const dispatch = useDispatch<AppDispatch>();
  const similarMovies = useSelector((state: RootState) => state.similar.similarMovies);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSimilarMovies(Number(id)));
  }, [dispatch, id]);

  return (
    similarMovies.length > 0 && (
      <div className=" p-10 rounded-lg gap-4 flex-wrap justify-between">
        <Carousel>
          <CarouselContent>
            {similarMovies.map((movie) => (
              <CarouselItem key={movie.id} className="md:basis-1/3">
                <Link
                  to={`/movie/${movie.id}`}
                  className="bg-main-bg  block rounded-lg overflow-hidden "
                >
                  <img
                    className="h-[300px] w-full"
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                  />
                  <div className="p-5">
                    <p className="text-md mb-3 font-bold">{movie.title}</p>
                    <p className="truncated-text">{movie.overview}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
  );
}

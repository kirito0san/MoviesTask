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
      <div className="flex-wrap gap-4 justify-between p-10 rounded-lg">
        <Carousel>
          <CarouselContent>
            {similarMovies.map((movie) => (
              <CarouselItem key={movie.id} className="md:basis-1/3">
                <Link
                  to={`/movie/${movie.id}`}
                  className="block overflow-hidden rounded-lg bg-main-bg"
                >
                  <div className="pt-2 w-full aspect-w-16 aspect-h-9">
                    <img
                      className="object-contain mx-auto max-h-[400px]"
                      src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                      alt={movie.title}
                    />
                  </div>
                  <div className="p-5">
                    <p className="mb-3 font-bold text-md">{movie.title}</p>
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

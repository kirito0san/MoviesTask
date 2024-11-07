import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination.tsx";
import { pageChange } from "@/features/Movies/MoviesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function PaginationDemo() {
  const dispatch = useDispatch<AppDispatch>();

  const { currentPage, totalPages } = useSelector((state: RootState) => state.movies);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  return (
    <Pagination className="rounded-lg bg-main-bg">
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationPrevious onClick={() => dispatch(pageChange(currentPage - 1))} />
          </PaginationItem>
        ) : (
          ""
        )}
        <PaginationItem>
          {currentPage > 2 ? (
            <PaginationLink onClick={() => dispatch(pageChange(currentPage - 2))}>
              {currentPage - 2}
            </PaginationLink>
          ) : (
            ""
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => dispatch(pageChange(currentPage + 2))}>
            {currentPage + 2}
          </PaginationLink>
        </PaginationItem>
        {currentPage !== totalPages ? (
          <PaginationItem>
            <PaginationNext onClick={() => dispatch(pageChange(currentPage + 1))} />
          </PaginationItem>
        ) : (
          ""
        )}
      </PaginationContent>
    </Pagination>
  );
}

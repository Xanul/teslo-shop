"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePaginationNumbers = () => {
    // Si hay 7 paginas o menos, mostrar todas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Si la pagina actual esta entre las primeras 3
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    // Si la pagina actual esta entre las ultimas 3
    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // Si la pagina actual esta en el medio
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const allPages = generatePaginationNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 my-10">
      {/* Botón Anterior */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 transition-all hover:bg-gray-100 hover:border-gray-400",
          currentPage === 1
            ? "pointer-events-none opacity-50 bg-gray-100"
            : "hover:bg-gray-100 hover:border-gray-400"
        )}
        aria-disabled={currentPage === 1}
      >
        <IoChevronBackOutline className="w-4 h-4" />
      </Link>

      {/* Paginas */}
      {allPages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`elipsis-${index}`}
              className="flex items-center justify-center w-10 h-10 text-gray-400"
            >
              ...
            </span>
          );
        }

        const isActive = Number(page) === currentPage;

        return (
          <Link
            key={page}
            href={createPageURL(page)}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-md border transition-all font-medium",
              isActive
                ? "bg-blue-600 text-white border-blue-600 pointer-events-none"
                : "border-gray-300 hover:bg-gray-100 hover:border-gray-400"
            )}
          >
            {page}
          </Link>
        );
      })}

      {/* Botón Siguiente */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 transition-all",
          currentPage >= totalPages
            ? "pointer-events-none opacity-50 bg-gray-100"
            : "hover:bg-gray-100 hover:border-gray-400"
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <IoChevronForwardOutline className="w-4 h-4" />
      </Link>
    </div>
  );
};

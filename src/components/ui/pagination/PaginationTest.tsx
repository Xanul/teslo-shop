"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePaginationNumbers = () => {
    // Si hay 7 páginas o menos, mostrar todas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Si la página actual está entre las primeras 3
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    // Si la página actual está entre las últimas 3
    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // Si la página actual está en el medio
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

  const pages = generatePaginationNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 my-10">
      {/* Botón Anterior */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 transition-all",
          currentPage === 1
            ? "pointer-events-none opacity-50 bg-gray-100"
            : "hover:bg-gray-100 hover:border-gray-400"
        )}
        aria-disabled={currentPage === 1}
      >
        <IoChevronBackOutline className="w-4 h-4" />
      </Link>

      {/* Números de página */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10 text-gray-400"
            >
              ...
            </span>
          );
        }

        const pageNumber = Number(page);
        const isActive = pageNumber === currentPage;

        return (
          <Link
            key={page}
            href={createPageURL(pageNumber)}
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
          currentPage === totalPages
            ? "pointer-events-none opacity-50 bg-gray-100"
            : "hover:bg-gray-100 hover:border-gray-400"
        )}
        aria-disabled={currentPage === totalPages}
      >
        <IoChevronForwardOutline className="w-4 h-4" />
      </Link>
    </div>
  );
};

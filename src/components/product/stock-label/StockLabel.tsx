"use client";
import { getProductStockBySlug } from "@/actions/product/get-stock-by-slug.action";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface StockLabelProps {
  slug: string;
}

export const StockLabel = ({ slug }: StockLabelProps) => {
  const [stock, setStock] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as loading
  const [error, setError] = useState(false);

  useEffect(() => {
    const getStock = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const stockData = await getProductStockBySlug(slug);

        if (stockData?.inStock !== undefined) {
          setStock(stockData.inStock);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching stock:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getStock();
  }, [slug]);

  // Loading state with proper ARIA
  if (isLoading) {
    return (
      <div
        className={`${titleFont.className} inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-sm font-medium`}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
        <span className="text-gray-500">Loading…</span>
      </div>
    );
  }

  // Error state with proper ARIA
  if (error || stock === null) {
    return (
      <div
        className={`${titleFont.className} inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-sm font-medium`}
        role="status"
        aria-label="Stock unavailable"
      >
        <span className="w-2 h-2 bg-gray-400 rounded-full" />
        <span className="text-gray-500">Stock unavailable</span>
      </div>
    );
  }

  // Success state with color-coded status
  const inStock = stock > 0;
  const stockStatus = inStock ? "In Stock" : "Out of Stock";
  const statusColor = inStock
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-red-50 text-red-700 border-red-200";
  const dotColor = inStock ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${titleFont.className} inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusColor} text-sm font-medium transition-colors`}
      role="status"
      aria-label={`${stockStatus}: ${stock} units available`}
    >
      <span
        className={`w-2 h-2 rounded-full ${dotColor} ${inStock ? "animate-pulse" : ""}`}
        aria-hidden="true"
      />
      <span>
        {stockStatus} {inStock && `(${stock})`}
      </span>
    </div>
  );
};

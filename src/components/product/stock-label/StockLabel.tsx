"use client";
import { getProductStockBySlug } from "@/actions/product/get-stock-by-slug.action";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface StockLabelProps {
  slug: string;
}

export const StockLabel = ({ slug }: StockLabelProps) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getStock = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const stockData = await getProductStockBySlug(slug);

        if (stockData && stockData.inStock !== undefined) {
          setStock(stockData.inStock);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching stock: ", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getStock();
  }, [slug]);

  if (isLoading) {
    return (
      <div className={`${titleFont.className} antialiased font-bold text-lg`}>
        <span className="inline-block animate-pulse bg-gray-200 rounded h-6 w-24"></span>
      </div>
    );
  }

  if (error || stock === null) {
    return (
      <h1
        className={`${titleFont.className} antialiased font-bold text-xl text-gray-400`}
      >
        Stock: ---
      </h1>
    );
  }

  return (
    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
      Stock: {`${stock}`}
    </h1>
  );
};

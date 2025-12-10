"use client";
import { Size } from "@/interfaces";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChange,
}: SizeSelectorProps) => {
  return (
    <div className="py-1 md:py-5">
      <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-700 mb-4">
        Tallas Disponibles
      </h3>
      <div className="flex gap-3 flex-wrap">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out border-2",
              selectedSize === size
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30 scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:shadow-md hover:scale-105"
            )}
            onClick={() => onSizeChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

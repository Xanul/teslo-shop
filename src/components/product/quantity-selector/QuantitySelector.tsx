"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  maxQuantity?: number;
  minQuantity?: number;
}

export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  maxQuantity = 5,
  minQuantity = 1,
}: QuantitySelectorProps) => {
  
  const handleQuantityChange = (value: number) => {
    const newCount = quantity + value;

    if (newCount < minQuantity || newCount > maxQuantity) return;

    onQuantityChange(newCount);
  };

  const isMinReached = quantity <= minQuantity;
  const isMaxReached = quantity >= maxQuantity;

  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3 w-fit">
      <button
        onClick={() => handleQuantityChange(-1)}
        disabled={isMinReached}
        className="transition-all duration-200 ease-in-out hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
        aria-label="decrease quantity"
      >
        <IoRemoveCircleOutline
          size={24}
          className={isMinReached ? "text-gray-300" : "text-gray-500"}
        />
      </button>

      <div className="text-center min-w-12">
        <span className="text-xl font-medium text-gray-800 block">{quantity}</span>
      </div>

      <button
        onClick={() => handleQuantityChange(1)}
        disabled={isMaxReached}
        className="transition-all duration-200 ease-in-out hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
        aria-label="Increase quantity"
      >
        <IoAddCircleOutline
          size={24}
          className={isMaxReached ? "text-gray-300" : "text-gray-500"}
        />
      </button>
    </div>
  );
};

"use client";
import { SizeSelector, QuantitySelector, Button } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartProps {
  product: Product;
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const addProductToCart = useCartStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }

    try {
      setIsLoading(true);
      const newProduct: CartProduct = {
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
        image: product.images[0],
      };

      addProductToCart(newProduct);

      toast.success(`${product.title} added to cart`, {
        description: `Size: ${selectedSize} - Quantity: ${quantity}`,
      });

      setShowError(false);
    } catch (error) {
      toast.error("Error adding item to cart");
      console.error("Error adding to cart: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Size selector */}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      {/* Error message */}
      {showError && (
        <p
          className="text-red-600 dark:text-red-400 text-sm font-medium fade-in bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-md border border-red-200 dark:border-red-800"
          role="alert"
          aria-live="polite"
        >
          Please select a size
        </p>
      )}

      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Button */}
      <Button
        onClick={addToCart}
        disabled={isLoading}
        className="my-2 md:my-5 w-full"
        variant="primary"
        size="md"
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
};

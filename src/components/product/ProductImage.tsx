"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ProductImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt: string;
  placeholderSrc?: string;
  showPlaceholderOnError?: boolean;
}

export const ProductImage = ({
  src,
  alt,
  placeholderSrc = "/imgs/placeholder.png",
  showPlaceholderOnError = true,
  width = 500,
  height = 500,
  className = "",
  ...props
}: ProductImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(() =>
    getImageUrl(src, placeholderSrc),
  );
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (showPlaceholderOnError && !hasError) {
      setHasError(true);
      setImgSrc(placeholderSrc);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

function getImageUrl(
  imageUrl?: string | null,
  placeholderPath: string = "/imgs/placeholder.png",
): string {
  // Si no hay imagen, retornar placeholder
  if (!imageUrl || imageUrl.trim() === "") {
    return placeholderPath;
  }

  // Si la imagen es una URL externa (comienza con http:// o https://)
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Si es una imagen local, agregar el prefijo /products/
  return `/products/${imageUrl}`;
}

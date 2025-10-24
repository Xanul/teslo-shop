"use client";
import { Product } from "@/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface ProductGridItemProps {
    product: Product;
}

export const ProductGridItem = ({ product }: ProductGridItemProps) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    return (
        <div className={cn("rounded-md overflow-hidden fade-in")}>
            <Image 
                src={`/products/${displayImage}`}
                alt={product.title}
                className="w-full object-cover transition-all duration-300 hover:scale-105 rounded-md"
                width={500}
                height={500}
                onMouseEnter={() => setDisplayImage(product.images[1])}
                onMouseLeave={() => setDisplayImage(product.images[0])}
            />
            <div className="p-4 flex flex-col">
                <Link 
                className="hover:text-blue-600"
                href={`/product/${product.slug}`}>
                    {product.title}
                </Link>
                    <span className="font-bold">$ {product.price}</span>
            </div>
        </div>
    )
}
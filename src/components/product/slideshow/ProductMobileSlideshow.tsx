"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";
import { ProductImage } from "../ProductImage";

interface ProductMobileSlideshowProps {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({
  images,
  title,
  className,
}: ProductMobileSlideshowProps) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vh",
          height: "500px",
        }}
        pagination
        navigation={true}
        autoplay={{
          delay: 5000,
        }}
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        className="mySwipe2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              alt={title}
              width={600}
              height={500}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

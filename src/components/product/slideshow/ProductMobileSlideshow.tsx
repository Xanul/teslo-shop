"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";

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
          width: '100vh',
          height: '500px'
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
            <Image
              src={`/products/${image}`}
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

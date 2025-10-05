import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageSliderProps {
  images: ImageData[];
  fadeEffect?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  speed?: number;
  priority?: boolean;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

function ImageSlider({
  images,
  priority = false,
  fadeEffect = false,
  autoplay = true,
  loop = true,
  slidesPerView = 1,
  spaceBetween = 30,
  speed = 300,
  className = "",
  direction = 'horizontal',
}: ImageSliderProps) {
  const modules = [Navigation, Pagination];
  
  if (fadeEffect) {
    modules.push(EffectFade);
  }
  
  if (autoplay) {
    modules.push(Autoplay);
  }

  return (
    <div className={`image-slider ${className}`}>
      <Swiper
        modules={modules}
        effect={fadeEffect ? 'fade' : 'slide'}
        fadeEffect={fadeEffect ? { crossFade: true } : undefined}
        slidesPerView={slidesPerView}
        direction={direction}
        spaceBetween={spaceBetween}
        loop={loop}
        navigation={false}
        pagination={false}
        autoplay={autoplay ? {
          delay: 3000,
          disableOnInteraction: false,
        } : false}
        speed={speed}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                loading={priority ? "eager" : "lazy"}
                width={image.width || 1200}
                height={image.height || 800}
                className="object-cover w-full h-full"
                priority={priority}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider
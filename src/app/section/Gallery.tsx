import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { useInitialAlert } from "~/lib/initial-clicked";
import gsap from "gsap";

interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

function Gallery() {
  const { isClicked, shouldShowAlert } = useInitialAlert();
  const titleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const galleryImages: GalleryImage[] = [
    {
      src: '/image1.jpg',
      width: 800,
      height: 1000,
      alt: 'Wedding photo 1'
    },
    {
      src: '/image2.jpg',
      width: 800,
      height: 1200,
      alt: 'Wedding photo 2'
    },
    {
      src: '/image3.jpg',
      width: 800,
      height: 1200,
      alt: 'Wedding photo 3'
    },
    {
      src: '/image4.jpg',
      width: 800,
      height: 900,
      alt: 'Wedding photo 4'
    },
  ];

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#wedding-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  useEffect(() => {
    const shouldStartAnimation = !shouldShowAlert || isClicked;

    if (shouldStartAnimation && titleRef.current && galleryRef.current) {
      // Set initial states
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(".gallery-item", { y: 60, opacity: 0, scale: 0.9 });

      // Create timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true
        }
      });

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(".gallery-item", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.3");
    }
  }, [shouldShowAlert, isClicked]);

  return (
    <div className="mt-20 px-4">
      <div ref={titleRef} className="flex flex-col items-center text-center mb-12">
        <h1 className="font-creattion text-6xl text-black">Our</h1>
        <h3 className="text-4xl italic text-black tracking-wider uppercase">Gallery</h3>
      </div>

      <div ref={galleryRef} className="pswp-gallery grid grid-cols-2 grid-rows-2 gap-4 max-w-6xl mx-auto" id="wedding-gallery">
        {galleryImages.map((image, index) => (
          <a
            href={image.src}
            data-pswp-width={image.width}
            data-pswp-height={image.height}
            key={`wedding-gallery-${index}`}
            target="_blank"
            rel="noreferrer"
            className="gallery-item block overflow-hidden rounded-lg hover:opacity-90 transition-opacity duration-300"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
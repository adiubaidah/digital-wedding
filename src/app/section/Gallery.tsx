import React, { useEffect } from 'react';
import Image from 'next/image';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

function Gallery() {
  const galleryImages: GalleryImage[] = [
    {
      src: '/image.png',
      width: 1200,
      height: 800,
      alt: 'Wedding photo 1'
    },
    {
      src: '/image2.png',
      width: 1200,
      height: 800,
      alt: 'Wedding photo 2'
    },
    {
      src: '/image.png',
      width: 1200,
      height: 800,
      alt: 'Wedding photo 3'
    },
    {
      src: '/image2.png',
      width: 1200,
      height: 800,
      alt: 'Wedding photo 4'
    },
    {
      src: '/image.png',
      width: 1200,
      height: 800,
      alt: 'Wedding photo 5'
    },
    {
      src: '/image2.png',
      width: 1200,
      height: 800,
      alt: 'Wedding photo 6'
    }
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

  return (
    <div className="mt-20 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="font-creattion text-6xl text-black">Our</h1>
        <h3 className="text-4xl italic text-black tracking-wider uppercase">Gallery</h3>
      </div>

      <div className="pswp-gallery grid grid-cols-3 grid-rows-2 gap-4 max-w-6xl mx-auto" id="wedding-gallery">
        {galleryImages.map((image, index) => (
          <a
            href={image.src}
            data-pswp-width={image.width}
            data-pswp-height={image.height}
            key={`wedding-gallery-${index}`}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-lg hover:opacity-90 transition-opacity duration-300"
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
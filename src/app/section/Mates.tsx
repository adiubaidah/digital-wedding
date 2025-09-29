'use client'

import React, { useRef } from "react";
import ImageSlider from "~/components/custom/ImageSlider";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


function Mates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true
      }
    });

    tl.fromTo(".line", {
      strokeDasharray: 1920,
      strokeDashoffset: 1920
    }, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.out"
    });


    tl.fromTo(".heart--is-large", {
      opacity: 0,
      scale: 0.5,
      transformOrigin: "25% 100%"
    }, {
      opacity: 0.5,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    }, "+=0.33");

    tl.fromTo(".heart--is-small", {
      opacity: 0,
      scale: 0.5,
      transformOrigin: "4% 100%"
    }, {
      opacity: 0.5,
      scale: 1,
      duration: 0.75,
      ease: "power2.out"
    }, "+=0.33");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="px-6 text-white mt-44">
      <div className="bg-[#D6D6D6] shadow-2xl relative h-[680px] rounded-[70px] flex flex-col justify-center items-center">
        <ImageSlider
          className="h-[324px] w-[324px] z-10 absolute -top-[195px] rounded-[90px] overflow-hidden"
          images={[
            {
              src: "/image.png",
              width: 800,
              height: 600,
              alt: "Description of image",
            },
            {
              src: "/image2.png",
              width: 800,
              height: 600,
              alt: "Description of image",
            },
          ]}
        />

        <div className="text-center">
          <p className="font-noto-serif text-3xl text-gray-700">Nina Nur Vina</p>
          <small className="font-poppins font-semibold inline-block w-60 mt-3 text-gray-700">
            Putri Ke 6 Dari Bapak Parkun & Ibu Siti Nur Hidayah
          </small>
        </div>

        <div className="flex items-center justify-center relative">
          <svg 
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 831 509" 
            className="max-w-[300px] w-full"
            style={{
              transformBox: 'fill-box'
            }}
          >
            <path 
              className="heart heart--is-small" 
              d="M444.44,386.14c1.63-56.83,22.45-110.89,42.05-120.77,19.6-9.88,44.18.53,40.96,36.43,28.54-14.75,68.81-13.58,72.18,16.2,2.82,24.86-27.91,34.7-62.9,37.01-34.98,2.31-67.64,12.11-92.3,31.13Z"
              style={{
                fill: '#fab4b4',
                strokeWidth: 0
              }}
            />
            <path 
              className="heart heart--is-large" 
              d="M441,401.62c-10.03-35.56-29.5-70.5-43-113s-8.18-96.55,20-98c18.22-.94,27.5,15.4,30,42,51.67-71.77,131.93-55.64,145.5-33.5,22.26,36.34-23.06,66.74-59.5,85.5-54.49,28.06-75.94,72.67-93,117Z"
              style={{
                fill: '#fab4b4',
                strokeWidth: 0
              }}
            />
            <path 
              className="line" 
              d="M53.5,319.12c104.85-75.98,214.82-13.62,266,17,49.53,29.64,72.22,56.76,92,50,30.52-10.43-48.19-89.59-55-141-4.55-34.38,12.5-57.5,41-54s34.96,28.4,32,63c13.71-42.57,60.57-69.96,88-68,33.48,2.39,46.34,37.12,0,68-59.6,39.72-81.13,107.21-80,126-23.44-57.19-32.08-99.35-6.5-114.5,32.51-19.25,63.84,2.79,55,41,22.64-35.77,51.42-38.85,65-25,18.95,19.33-2.51,41.08-33,53-26.82,10.49-46.45,19.63-59,34,48.29-70.94,94.69-86.65,172-93,65.87-5.41,112.71,26.72,187,17"
              style={{
                fill: 'none',
                stroke: '#a08970',
                strokeMiterlimit: 10,
                strokeWidth: '2px'
              }}
            />
          </svg>
        </div>

        <div className="text-center">
          <p className="font-noto-serif text-3xl text-gray-700">Mochammad Akbar Wahyu Hidayatulloh</p>
          <small className="font-poppins font-semibold inline-block w-60 mt-3 text-gray-700">
            Putra Ke 2 Dari Bapak Bambang Wahyudi & Ibu Siti Nur Chasanah
          </small>
        </div>

        <ImageSlider
          className="h-[324px] w-[324px] z-10 absolute -bottom-[195px]  rounded-[90px] overflow-hidden"
          images={[
            {
              src: "/image.png",
              width: 800,
              height: 600,
              alt: "Description of image",
            },
            {
              src: "/image2.png",
              width: 800,
              height: 600,
              alt: "Description of image",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Mates;
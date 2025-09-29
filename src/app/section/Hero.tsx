import React from "react";
import ImageSlider from "~/components/custom/ImageSlider";

function Header() {
  return (
    <div className="relative">
      <ImageSlider
        className="w-full h-[500px] -z-10 bg-amber-200"
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
            alt: "Description of image 2",
          },
        ]}
      />
    <div className="absolute inset-0 bg-gradient-to-b from-[#BEBEBE]/0 to-[#BEBEBE] z-10"></div>

      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <h4 className="font-nunito tracking-widest text-[16px] text-white">
          THE WEDDING OF
        </h4>

        <h1 className="font-hello-paris text-8xl flex gap-x-4 text-white">
          <span>N</span>
          <span>A</span>
        </h1>

        <div className="w-80 h-20 flex justify-between items-center mt-4 text-white">
          <div className="flex flex-col items-center">
            <p className="font-sora text-2xl">
              0
            </p>
            <small className="text-[11px]">
              Days
            </small>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-sora text-2xl">
              0
            </p>
            <small className="text-[11px]">
              Hour
            </small>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-sora text-2xl">
              0
            </p>
            <small className="text-[11px]">
              Minutes
            </small>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-sora text-2xl">
              0
            </p>
            <small className="text-[11px]">
              Seconds
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import ImageSlider from "~/components/custom/ImageSlider";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function WeddingEvent() {
  return (
    <div className="mt-56 px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-creattion text-6xl text-black">Wedding</h1>
        <h3 className="text-4xl italic text-black tracking-wider">Event</h3>
      </div>

      <div className="mt-10">
        <ImageSlider
          className="h-[245px] rounded-t-[110px] overflow-hidden"
          images={[
            { src: "/image.png", alt: "Image", height: 600, width: 800 },
          ]}
        />
        <div className="flex h-[320px] bg-white">
          <div className="h-full text-[40px] bg-[#9E9E9E] flex items-center">
            <p className="-rotate-90 font-noto-serif">Resepsi</p>
          </div>
          <div className="flex-1 px-7">
            <div className="flex gap-x-3 items-center justify-center mt-5">
              <span className="font-noto-serif font-bold text-6xl">12</span>
              <div className="font-nunito uppercase">
                <p>Sabtu</p>
                <p>November</p>
                <p>2025</p>
              </div>
            </div>
            <hr className="bg-black h-[1px] mt-4" />
            <div className="mt-4">
              <p className="flex items-center gap-x-4">
                <Clock size={19} />
                <small>09.00 WIB - Selesai</small>
              </p>

              <p className="uppercase font-poppins text-[17px] font-bold mt-7">
                Lokasi Acara
              </p>
              <p className="font-poppins text-[16px]">
                Jl. Raya No.123, Jakarta
              </p>

              <Link
                href="https://www.google.com/maps?q=Jl.+Raya+No.123,+Jakarta"
                target="_blank"
                className={cn(buttonVariants({size: "sm",}), "mt-5 px-6 text-white bg-[#9E9E9E] hover:bg-gray-900 ") }
              >
                <MapPin />
                <span>GOOGLE MAP</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingEvent;

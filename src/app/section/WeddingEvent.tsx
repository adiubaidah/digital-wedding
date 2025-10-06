import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import ImageSlider from "~/components/custom/ImageSlider";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useInitialAlert } from "~/lib/initial-clicked";
import gsap from "gsap";

function WeddingEvent() {
  const { isClicked, shouldShowAlert } = useInitialAlert();
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shouldStartAnimation = !shouldShowAlert || isClicked;

    if (
      shouldStartAnimation &&
      titleRef.current &&
      imageRef.current &&
      contentRef.current
    ) {
      // Set initial states
      gsap.set(titleRef.current, { y: 60, opacity: 0 });
      gsap.set(imageRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(contentRef.current, { y: 80, opacity: 0 });

      // Create timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          imageRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          contentRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );
    }
  }, [shouldShowAlert, isClicked]);

  return (
    <div className="mt-56 px-4">
      <div ref={titleRef} className="flex flex-col items-center text-center">
        <h1 className="font-creattion text-6xl text-black">Wedding</h1>
        <h3 className="text-4xl italic text-black tracking-wider">Event</h3>
      </div>

      <div className="mt-10">
        <div ref={imageRef}>
          <ImageSlider
            className="h-[245px] rounded-t-[110px] overflow-hidden"
            images={[
              { src: "/image4.jpg", alt: "Image", height: 300, width: 400 },
            ]}
          />
        </div>
        <div ref={contentRef} className="flex h-[360px] bg-white">
          <div className="h-full text-[40px] bg-[#9E9E9E] flex items-center">
            <p className="-rotate-90 font-noto-serif">Resepsi</p>
          </div>
          <div className="flex-1 px-7">
            <div className="flex gap-x-3 items-center justify-center mt-5">
              <span className="font-noto-serif font-bold text-6xl">12</span>
              <div className="font-nunito uppercase">
                <p>Sabtu</p>
                <p>Oktober</p>
                <p>2025</p>
              </div>
            </div>
            <hr className="bg-black h-[1px] mt-4" />
            <div className="mt-4">
              <p className="flex items-center gap-x-4">
                <Clock size={19} />
                <small>13.00 WIB - Selesai</small>
              </p>

              <p className="uppercase font-poppins text-[17px] font-bold mt-7">
                Lokasi Acara
              </p>
              <p className="font-poppins text-[12px]">
                Ds. Petahunan RT : 03 : RW 01, Area Pertenakan Fiqih etawa Petahunan Kec. Sumbersuko Kab. Lumajang
              </p>

              <Link
                href="https://maps.app.goo.gl/TaWDLnTCNhGLrVtQA?g_st=aw"
                target="_blank"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "mt-5 px-6 text-white bg-[#9E9E9E] hover:bg-gray-900 "
                )}
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

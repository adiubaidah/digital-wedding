import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "~/components/custom/ImageSlider";
import { useInitialAlert } from "~/lib/initial-clicked";
import gsap from "gsap";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Header() {
  const { isClicked, shouldShowAlert } = useInitialAlert();
  const nLetterRef = useRef<HTMLSpanElement>(null);
  const aLetterRef = useRef<HTMLSpanElement>(null);
   const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  const calculateTimeLeft = (): TimeLeft => {
    const weddingDate = new Date(process.env.NEXT_PUBLIC_WEDDING_DAY || "");
    const now = new Date();
    const difference = weddingDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

    useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const shouldStartAnimation = !shouldShowAlert || isClicked;

    if (shouldStartAnimation && nLetterRef.current && aLetterRef.current) {
      gsap.set(nLetterRef.current, { x: -100, opacity: 0 });
      gsap.to(nLetterRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.set(aLetterRef.current, { x: 100, opacity: 0 });
      gsap.to(aLetterRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [shouldShowAlert, isClicked]);

  return (
    <div className="relative">
      <ImageSlider
        className="w-full h-[500px] -z-10"
        fadeEffect
        priority
        images={[
          {
            src: "/image1.jpg",
            width: 800,
            height: 600,
            alt: "Description of image",
          },
          {
            src: "/image2.jpg",
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
          <span ref={nLetterRef}>A</span>
          <span ref={aLetterRef}>N</span>
        </h1>

        <div className="w-80 h-20 flex justify-between items-center mt-4 text-white">
          <div className="flex flex-col items-center">
            <p className="font-sora text-2xl">{timeLeft.days}</p>
            <small className="text-[11px]">Days</small>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-sora text-2xl">{timeLeft.hours}</p>
            <small className="text-[11px]">Hour</small>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-sora text-2xl">{timeLeft.minutes}</p>
            <small className="text-[11px]">Minutes</small>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-sora text-2xl">{timeLeft.seconds}</p>
            <small className="text-[11px]">Seconds</small>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;

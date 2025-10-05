import React, { useRef, useEffect } from "react";
import ImageSlider from "~/components/custom/ImageSlider";
import { useInitialAlert } from "~/lib/initial-clicked";
import gsap from "gsap";

function Footer() {
  const { isClicked, shouldShowAlert } = useInitialAlert();
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shouldStartAnimation = !shouldShowAlert || isClicked;

    if (
      shouldStartAnimation &&
      contentRef.current &&
      titleRef.current &&
      textRef.current &&
      signatureRef.current
    ) {
      // Set initial states
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(textRef.current, { y: 40, opacity: 0 });
      gsap.set(signatureRef.current, { y: 30, opacity: 0 });

      // Create timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
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
          textRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          signatureRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }
  }, [shouldShowAlert, isClicked]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a2929] to-[#2a2929]/0 z-10"></div>
      <ImageSlider
        className="h-[500px] w-full object-cover"
        fadeEffect
        images={[
          { src: "/image1.jpg", alt: "Footer1", width: 500, height: 300 },
          { src: "/image4.jpg", alt: "Footer1", width: 500, height: 300 },
        ]}
        direction="vertical"
      />

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-10 z-10 bg-white/70"
      >
        <div ref={titleRef}>
          <h1 className="font-noto-serif text-4xl">Terimakasih</h1>
          <p className="font-poppins mt-3 font-bold">ٱلْـحَمْدُ لِلّٰهِ جَزَاكُمُ ٱللّٰهُ خَيْرًا</p>
        </div>

        <div ref={textRef}>
          <p className="font-poppins text-[12px] mt-3">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila
            Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do&apos;a restu kepada
            kami
          </p>
        </div>

        <div ref={signatureRef} className="mt-20">
          <p className="font-noto-serif text-[15px] uppercase font-bold">
            Kami Yang Berbahagia
          </p>
          <span className="font-poppins">Nina & Akbar</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;

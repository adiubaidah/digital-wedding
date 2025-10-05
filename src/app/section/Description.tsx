import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useInitialAlert } from "~/lib/initial-clicked";
import gsap from "gsap";

function Description() {
  const { isClicked, shouldShowAlert } = useInitialAlert();
   const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const verseRef = useRef<HTMLParagraphElement>(null);
  const bismillahRef = useRef<HTMLImageElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shouldStartAnimation = !shouldShowAlert || isClicked;

    if (
      shouldStartAnimation &&
      quoteRef.current &&
      verseRef.current &&
      bismillahRef.current &&
      greetingRef.current
    ) {
      gsap.set(quoteRef.current, { y: 50, opacity: 0 });
      gsap.set(verseRef.current, { y: 30, opacity: 0 });
      gsap.set(bismillahRef.current, { scale: 0, opacity: 0 });
      gsap.set(greetingRef.current, { y: 40, opacity: 0 });


      const tl = gsap.timeline({ delay: 0.5 , scrollTrigger:{
        trigger: containerRef.current,
        start: "top 80%",
        once: true
      }});

      tl.to(quoteRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          verseRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          bismillahRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        .to(
          greetingRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }
  }, [shouldShowAlert, isClicked]);

  return (
    <div className="w-full mt-20 py-10 px-6 flex flex-col items-center text-white" ref={containerRef}>
      <p
        ref={quoteRef}
        className="font-poppins h-16 text-center text-xs font-light italic leading-3"
      >
        Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
        pasangan- pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
        merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
        sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
        (kebesaran Allah) bagi kaum yang berpikir.
      </p>

      <p ref={verseRef} className="font-poppins mt-5">
        QS. Ar-Rum Ayat 21
      </p>

      <hr className="my-6 bg-white h-[1.5px] w-full" />
      <Image
        ref={bismillahRef}
        src={"/bismillah.png"}
        alt="Bismillah"
        width={500}
        height={300}
        className="h-12 w-72 object-contain"
      />
      <div
        ref={greetingRef}
        className="text-[11px] font-poppins mt-6 text-center space-y-2"
      >
        <p>Assalamualaikum warahmatullahi wabarakatuh</p>

        <p className="leading-3.5">
          Maha Suci Allah Subhanahu wa Ta&apos;ala yang telah menciptakan
          makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah dan Ridhoilah
          Pernikahan Kami.
        </p>
      </div>
    </div>
  );
}

export default Description;

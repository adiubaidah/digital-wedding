import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { useInitialAlert } from "~/lib/initial-clicked";
import gsap from "gsap";

function Gift() {
  const { isClicked, shouldShowAlert } = useInitialAlert();
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const physicalGiftRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [copiedStates, setCopiedStates] = useState({
    bsi: false,
    ovo: false,
    address: false,
  });

  const copyToClipboard = async (
    text: string,
    type: "bsi" | "ovo" | "address"
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [type]: true }));

      // Reset button text after 2 seconds
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopiedStates((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [type]: false }));
      }, 2000);
    }
  };

  useEffect(() => {
    const shouldStartAnimation = !shouldShowAlert || isClicked;

    if (
      shouldStartAnimation &&
      titleRef.current &&
      cardsRef.current &&
      physicalGiftRef.current &&
      imageRef.current
    ) {
      // Set initial states
      gsap.set(titleRef.current, { y: 60, opacity: 0 });
      gsap.set(".gift-card", { y: 80, opacity: 0, scale: 0.9 });
      gsap.set(physicalGiftRef.current, { y: 60, opacity: 0 });
      gsap.set(imageRef.current, { scale: 0.8, opacity: 0 });

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
          ".gift-card",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=0.4"
        )
        .to(
          physicalGiftRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          imageRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
    }
  }, [shouldShowAlert, isClicked]);

  return (
    <div className="bg-[#D6D6D6] px-6 mt-24 py-8">
      <div ref={titleRef} className="text-center">
        <h1 className="font-creattion text-6xl">Wedding Gift</h1>
        <p className="font-bold mt-4">
          ٱلْـحَمْدُ لِلّٰهِ جَزَاكُمُ ٱللّٰهُ خَيْرًا
        </p>
        <p className="mt-4 font-nunito leading-4">
          Doa restu anda merupakan karunia yang sangat berarti bagi kami. Namun
          jika memberi adalah ungkapan tanda kasih Anda, anda dapat memberi kado
          secara cashless maupun fisik.
        </p>
      </div>
      <div>
        <div ref={cardsRef} className="flex gap-x-6 mt-10">
          <div className="gift-card bg-white px-7 py-4 flex flex-col items-center justify-center shadow-lg">
            <Image src={"/bsi.jpeg"} width={200} height={200} alt="BSI Logo" />
            <div className="text-center">
              <p className="font-bold">No. Rekening</p>
              <p>7293683926</p>
              <p>a.n Nina Nur Vina</p>

              <Button
                onClick={() => copyToClipboard("7293683926", "bsi")}
                className="mt-2"
              >
                {copiedStates.bsi ? (
                  "Berhasil disalin!"
                ) : (
                  <>
                    <ClipboardCopy />
                    <span> Salin</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="gift-card bg-white px-7 py-4 flex flex-col items-center justify-center shadow-lg">
            <Image src={"/ovo.png"} width={200} height={200} alt="OVO Logo" />
            <div className="text-center">
              <p className="font-bold">No. Rekening</p>
              <p>087776723113</p>
              <p>a.n Akbar wahyu</p>

              <Button
                onClick={() => copyToClipboard("087776723113", "ovo")}
                className="mt-2"
              >
                {copiedStates.ovo ? (
                  "Berhasil disalin!"
                ) : (
                  <>
                    <ClipboardCopy />
                    <span> Salin</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div ref={imageRef} className="flex flex-col items-center">
        <Image
          src={"/image3.jpg"}
          alt="Wedding Gift"
          className="mt-10 w-80 rounded-4xl"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}

export default Gift;

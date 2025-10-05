"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import Hero from "./section/Hero";
import Description from "./section/Description";
import Mates from "./section/Mates";
import WeddingEvent from "./section/WeddingEvent";
import Gallery from "./section/Gallery";
import Gift from "./section/Gift";
import GuestBook from "./section/GuestBook";
import Messages from "./section/Messages";
import Footer from "./section/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InitialAlertProvider, useInitialAlert } from "~/lib/initial-clicked";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function ClientContent() {
  const { isClicked } = useInitialAlert();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current && !audioPlaying && isClicked) {
          await audioRef.current.play();
          setAudioPlaying(true);
        }
      } catch (error) {
        console.log("Audio autoplay prevented:", error);
      }
    };

    if (isClicked) {
      playAudio();
    }
  }, [isClicked, audioPlaying]);

  return (
      <main>
        <Hero />
        <Description />
        <Mates />
        <WeddingEvent />
        <Gallery />
        <Gift />
        <GuestBook />
        <Messages />
        <Footer />
        <audio
          ref={audioRef}
          src="../../../music.mp3"
          preload="auto"
          loop
          muted={false}
        />
      </main>
  );
}

function Client() {
  return (
    <InitialAlertProvider>
      <ClientContent />
    </InitialAlertProvider>
  );
}

export default Client;

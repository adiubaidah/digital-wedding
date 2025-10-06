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
import { Button } from "~/components/ui/button";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function ClientContent() {
  const { isClicked } = useInitialAlert();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const autoStartedRef = useRef(false);
  
  useEffect(() => {
    const playAudio = async () => {
      try {
         if (audioRef.current) {
          await audioRef.current.play();
          setAudioPlaying(true);
          autoStartedRef.current = true; // ensure we don't auto-play again
        }
      } catch (error) {
        console.log("Audio autoplay prevented:", error);
      }
    };

    if (isClicked) {
      playAudio();
    }
  }, [isClicked]);

    const handlePlayPause = async () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
        setAudioPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setAudioPlaying(true);
        } catch (error) {
          console.log("Audio play error:", error);
        }
      }
    }
  };


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

           <div className="fixed bottom-6 right-6 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePlayPause}
            className="bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
            aria-label={audioPlaying ? "Pause music" : "Play music"}
          >
            {audioPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </Button>
        </div>
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

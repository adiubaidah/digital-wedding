"use client";

import React, { useState, useEffect } from "react";
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
import InitialAlert from "~/components/custom/InitialAlert";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Client() {
  return (
    <>
      <InitialAlert />
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
      </main>
    </>
  );
}

export default Client;

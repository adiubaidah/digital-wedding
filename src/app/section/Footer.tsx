import React from "react";
import ImageSlider from "~/components/custom/ImageSlider";

function Footer() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a2929] to-[#2a2929]/0 z-10"></div>
      <ImageSlider
        className="h-[500px] w-full object-cover"
        images={[
          { src: "/image.png", alt: "Footer1", width: 500, height: 300 },
        ]}
        direction="vertical"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-10 z-10 bg-white/70">
        <h1 className="font-noto-serif text-4xl">Terimakasih</h1>
        <p>ٱلْـحَمْدُ لِلّٰهِ جَزَاكُمُ ٱللّٰهُ خَيْرًا</p>
        <p className="font-poppins text-[12px] mt-3">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila
          Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do&apos;a restu kepada
          kami
        </p>

        <p className="font-noto-serif text-[15px] uppercase font-bold mt-20">Kami Yang Berbahagia</p>
        <span className="font-poppins">Nina & Akbar</span>
      </div>
    </div>
  );
}

export default Footer;

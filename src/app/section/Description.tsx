import React from "react";
import Image from "next/image";

function Description() {
  return (
    <div className="w-full mt-20 py-10 px-6 flex flex-col items-center text-white">
      <p className="font-poppins h-16 text-center text-xs font-light italic leading-3">
        Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
        pasangan- pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
        merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
        sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
        (kebesaran Allah) bagi kaum yang berpikir.
      </p>

      <p className="font-poppins mt-5">QS. Ar-Rum Ayat 21</p>

      <hr className="my-6 bg-white h-[1.5px] w-full" />
      <Image
        src={"/bismillah.png"}
        alt="Bismillah"
        width={500}
        height={300}
        className="h-12 w-72 object-contain"
      />
      <div className="text-[11px] font-poppins mt-6 text-center space-y-2">
        <p>Assalamualaikum warahmatullahi wabarakatuh</p>

        <p className="leading-3.5">
          Maha Suci Allah Subhanahu wa Ta&apos;ala yang telah menciptakan makhluk-Nya
          berpasang-pasangan. Ya Allah, perkenankanlah dan Ridhoilah Pernikahan
          Kami.
        </p>
      </div>
    </div>
  );
}

export default Description;

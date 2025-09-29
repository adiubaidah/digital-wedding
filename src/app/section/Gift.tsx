import React, { useState } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { ClipboardCopy } from "lucide-react";

function Gift() {
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

  return (
    <div className="bg-[#D6D6D6] px-6 mt-24 py-8">
      <div className="text-center">
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
        <div className="flex gap-x-6 mt-10">
          <div className="bg-white px-7 py-4 flex flex-col items-center justify-center shadow-lg">
            <Image src={"/bsi.jpeg"} width={200} height={200} alt="BSI Logo" />
            <div className="text-center">
              <p className="font-bold">No. Rekening</p>
              <p>7293683926</p>
              <p>a.n Nina Nur Vina</p>

              <Button onClick={() => copyToClipboard("7293683926", "bsi")} className="mt-2">
                {copiedStates.bsi ? "Berhasil disalin!" : <><ClipboardCopy /><span> Salin</span></>}
              </Button>
            </div>
          </div>
          <div className="bg-white px-7 py-4 flex flex-col items-center justify-center shadow-lg">
            <Image src={"/ovo.png"} width={200} height={200} alt="OVO Logo" />
            <div className="text-center">
              <p className="font-bold">No. Rekening</p>
              <p>087776723113</p>
              <p>a.n Akbar wahyu</p>

              <Button onClick={() => copyToClipboard("087776723113", "ovo")} className="mt-2">
                {copiedStates.ovo ? "Berhasil disalin!" : <><ClipboardCopy /><span> Salin</span></>}
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center justify-center mt-8 p-6 space-y-3 shadow-xl">
          <p className="font-nunito uppercase tracking-widest">Kado Fisik</p>
          <p className="font-poppins">Kirim kado fisik ke alamat kami :</p>
          <Button
            onClick={() => copyToClipboard("Your address here", "address")}
          >
            {copiedStates.address ? "Berhasil disalin!" : <><ClipboardCopy /><span> Salin Alamat</span></>}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
      <Image src={"/image.png"} alt="Wedding Gift" className="mt-10 w-80 rounded-4xl" width={500} height={500} />

      </div>
    </div>
  );
}

export default Gift;

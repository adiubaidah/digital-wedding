import React, { useEffect, useState } from "react";
import { MailOpen } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Button } from "../ui/button";
import BubbleAnimation from "./BubbleAnimation";
import { useInitialAlert } from "~/lib/initial-clicked";

function InitialAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [receiverName, setReceiverName] = useState("Tamu Undangan"); // Default value
  const { shouldShowAlert, markAsClicked } = useInitialAlert();

  useEffect(() => {
    if (shouldShowAlert) {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get("to");
      // Use the to parameter if available, otherwise keep default
      if (toParam) {
        setReceiverName(decodeURIComponent(toParam));
      }
      setShowAlert(true);
    }
  }, [shouldShowAlert]);

  const handleCloseAlert = () => {
      confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowAlert(false);
    markAsClicked();
  };

  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent className="h-screen p-0">
        <div className="relative">
          <Image
            src={"/image2.jpg"}
            alt="Alert Image"
            width={800}
            height={1200}
            className="h-full w-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black z-10"></div>

          <BubbleAnimation />

          <div className="z-20 absolute inset-0 top-1/2 text-white px-6 h-fit">
            <div>
              <AlertDialogTitle className="uppercase font-nunito">
                The Wedding Of
              </AlertDialogTitle>
              <p className="font-noto-serif text-4xl">Akbar & Nina</p>

              <small className="mt-7 inline-block font-poppins">Dear</small>
              <p className="mt-2 font-poppins text-2xl font-bold">
                {receiverName}
              </p>
            </div>

            <AlertDialogAction asChild>
              <Button
                onClick={handleCloseAlert}
                className="mt-4 mx-auto bg-[#9c9c9c] px-5 font-nunito font-bold"
              >
                <MailOpen />
                <span>Open Invitation</span>
              </Button>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default InitialAlert;
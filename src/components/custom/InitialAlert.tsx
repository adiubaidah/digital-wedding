import React, { useEffect, useState } from "react";
import { MailOpen } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "~/components/ui/alert-dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import BubbleAnimation from "./BubbleAnimation";

function InitialAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [receiverName, setReceiverName] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get("to");

    if (toParam) {
      setReceiverName(decodeURIComponent(toParam));
      setShowAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent className="h-screen p-0">
        <div className="relative">
          <Image
            src={"/image.png"}
            alt="Alert Image"
            width={500}
            height={300}
            className="h-full w-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black z-10"></div>

          <BubbleAnimation />

          <div className="z-20 absolute inset-0 top-1/2 text-white px-6 h-fit">
            <div>
              <AlertDialogTitle className="uppercase font-nunito">The Wedding Of</AlertDialogTitle>
              <p className="font-noto-serif text-4xl">Nina & Akbar</p>

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

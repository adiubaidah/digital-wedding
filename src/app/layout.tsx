import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito, Poppins, Noto_Serif } from "next/font/google";
import "./globals.css";
import Provider from "~/lib/provider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const NotoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const Creattion = localFont({
  src: "./font/Creattion.otf",
  variable: "--font-creattion",
});

const HelloParis = localFont({
  src: [
    { path: "./font/HelloParis-Regular.ttf", weight: "400", style: "normal" },
    { path: "./font/HelloParis-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "./font/HelloParis-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font/HelloParis-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-hello-paris",
});

export const metadata: Metadata = {
  title: "Akbar Nina Wedding",
  metadataBase: new URL("https://akbarnina.adiiskandar.my.id"),
  description: "Undangan Pernikahan Akbar & Nina – 12 Oktober 2025. Mohon doa dan kehadiran Bapak/Ibu sebagai bentuk restu kami.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${poppins.variable} ${HelloParis.variable} ${Creattion.variable} ${NotoSerif.variable} bg-[#BEBEBE] text-black`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

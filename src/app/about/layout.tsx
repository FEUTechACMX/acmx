import { type Metadata } from "next";
import "src/styles/2023.css";
import { TRPCReactProvider } from "~/trpc/react";
import localFont from "next/font/local";
import { Habibi } from "next/font/google";
import { Abhaya_Libre } from "next/font/google";
import Navbar from "./(components)/NavBar";

const bostonAngel = localFont({
  src: "../../../public/fonts/Boston-Angel.ttf",
  variable: "--font-BostonAngel",
});
export const metadata: Metadata = {
  title: "About ACMX",
  description: "Learn about ACMX",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bostonAngel.variable}`}>
      <body>
        <Navbar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

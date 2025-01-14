import { type Metadata } from "next";
import "src/styles/2023.css";
import { TRPCReactProvider } from "~/trpc/react";
import localFont from "next/font/local";
import { Habibi } from "next/font/google";
import { Abhaya_Libre } from "next/font/google";
import Navbar from "./(components)/NavBar";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
const bostonAngel = localFont({
  src: "../../../public/fonts/Boston-Angel.ttf",
  variable: "--font-BostonAngel",
});
const IBMCondensed = IBM_Plex_Sans_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${bostonAngel.variable} ${IBMCondensed.className}`}
    >
      <body>
        <Navbar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

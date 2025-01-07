import "@/styles/globals.css";
import { Abhaya_Libre } from "@next/font/google";

import { Habibi } from "@next/font/google";

const habibi = Habibi({
  subsets: ["latin"],
  weights: ["400"], // Only regular weight available
});

const abhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  weights: ["400", "700"], // Load Regular and Bold
});

const sampleuseoffonts = () => {
  return (
    <div>
      <h1 style={{ fontFamily: "Boston Angel, sans-serif" }}>
        For Boston Angel
      </h1>
      <h1 className={abhayaLibre.className}>For Abhya Libre Font</h1>
      <h1 className={habibi.className}>For Habibi Font</h1>
    </div>
  );
};

export default sampleuseoffonts;

import { useState, useEffect } from "react";

interface LoaderProps {
  loadingPercentage: number;
}

export default function Loader({ loadingPercentage }: LoaderProps) {
  const [randomizedText, setRandomizedText] = useState("");
  const [mobileRandomizedText, setMobileRandomizedText] = useState("");

  const capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";

  const getRandomLetter = () => {
    const alphabets = Math.random() < 0.5 ? capitals : lowercase;
    return alphabets[Math.floor(Math.random() * alphabets.length)];
  };

  const generateRandomString = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += getRandomLetter();
    }
    return result;
  };

  useEffect(() => {
    setRandomizedText(generateRandomString(64));
    setMobileRandomizedText(generateRandomString(32));

    const interval = setInterval(() => {
      setRandomizedText((prev) => {
        const index = Math.floor(Math.random() * prev.length);
        const newChar = getRandomLetter();
        return prev.substring(0, index) + newChar + prev.substring(index + 1);
      });
      setMobileRandomizedText((prev) => {
        const index = Math.floor(Math.random() * prev.length);
        const newChar = getRandomLetter();
        return prev.substring(0, index) + newChar + prev.substring(index + 1);
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-5xl px-8">
        <div className="flex flex-col items-center justify-center md:hidden">
          <div className="mt-4 font-mono text-sm">
            <span>▸▸ LOADING - {loadingPercentage}%</span>
          </div>
          <div
            className="mt-2 h-1 bg-white transition-all duration-300 ease-linear"
            style={{ width: `${loadingPercentage}%` }}
          ></div>
        </div>

        <div className="hidden md:block">
          <div className="relative mb-2 h-1 w-full bg-gray-800">
            <div
              className="h-1 bg-white transition-all duration-300 ease-linear"
              style={{ width: `${loadingPercentage}%` }}
            ></div>

            <div className="absolute left-0 right-0 top-0 mt-2 flex justify-between font-mono text-sm text-gray-400">
              <span>▸▸ LOADING - {loadingPercentage}%</span>
              <span>{randomizedText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

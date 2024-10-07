import { useState, useEffect } from "react";

interface LoaderProps {
  loadingPercentage: number;
}

export default function Loader({ loadingPercentage }: LoaderProps) {
  const [randomizedText, setRandomizedText] = useState("");

  const capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";

  // Function to get a random letter (either capital or lowercase)
  const getRandomLetter = () => {
    const alphabets = Math.random() < 0.5 ? capitals : lowercase;
    return alphabets[Math.floor(Math.random() * alphabets.length)];
  };

  // Function to generate a random string of a given length
  const generateRandomString = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += getRandomLetter();
    }
    return result;
  };

  useEffect(() => {
    // Set the initial randomized text
    setRandomizedText(generateRandomString(64));

    const interval = setInterval(() => {
      setRandomizedText((prev) => {
        // Change one random letter in the string
        const index = Math.floor(Math.random() * prev.length);
        const newChar = getRandomLetter();
        return prev.substring(0, index) + newChar + prev.substring(index + 1);
      });
    }, 25); // Control speed of changing letters

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      <div className="w-full max-w-5xl px-8">
        {/* Progress Bar */}
        <div className="relative mb-2 h-1 w-full bg-gray-200">
          <div
            className="h-1 bg-black transition-all duration-300 ease-linear"
            style={{ width: `${loadingPercentage}%` }}
          ></div>

          {/* Loading Text (Left) and Randomized String (Right) */}
          <div className="absolute left-0 right-0 top-0 mt-2 flex justify-between font-mono text-sm">
            <span>▸▸ LOADING - {loadingPercentage}%</span>
            {/* Randomized Alphabetic Text */}
            <span>{randomizedText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

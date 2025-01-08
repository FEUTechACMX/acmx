"use client";
import { CirclePause, CirclePlay } from "lucide-react";
import {  useRef, useState } from "react";
import { Button } from "./button";

export default function PlayButton() {
  const [isClick, setIsClick] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (audioRef.current) {
      if (isClick) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsClick(!isClick);
  };

 
  return (
    <>
    <audio ref={audioRef} src="/BackgroundMusic.mp3" loop />
    <Button onClick={handleClick}>
      {isClick ? <CirclePause /> : <CirclePlay />}
    </Button>
    </>
  );
}

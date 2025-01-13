"use client";
import { CirclePause, CirclePlay } from "lucide-react";
import {  forwardRef, useRef, useState } from "react";

/*Optional Props */
const PlayButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref)=> {
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
    <button onClick={handleClick} ref={ref} {...props}>
      {isClick ? <CirclePause size={70} strokeWidth={1}  /> : <CirclePlay size={70} strokeWidth={1}/>}
    </button>
    </>
  );
});
export default PlayButton;
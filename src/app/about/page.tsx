"use client";
import PlayButton from "~/components/ui/play-button";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { StarsBackground } from "~/components/ui/stars-background";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

export default function Home() {
  const titleRef = useRef(null);
  const playButtonRef = useRef(null);
  const header1Ref = useRef(null);
  const header2Ref = useRef(null);
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  

  useEffect( () => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        text: "Enter the world of ACMx",
        duration: 1.5,
        delay: 0.7,
      });
    };
    if (playButtonRef.current) {
      gsap.fromTo(
        playButtonRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.5 }
      );
    };
    if(header1Ref.current){
      gsap.to(header1Ref.current, {
        scrollTrigger:{
          trigger: header1Ref.current,
          start: "top 20%",
          end: "bottom top",
          scrub: 1,
          markers:true
        },
        x:'50%',
        ease: "none",
      })
    };
  },[]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0D17] text-customWhite">
      <div className="fixed inset-0 z-0 h-full w-full">
        <StarsBackground />
        <ShootingStars />
      </div>
      <section className="z-20 flex h-screen flex-col items-center justify-center px-4 text-center leading-tight sm:leading-normal">
        <h1
          className="font-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
          ref={titleRef}
        >
          Hello, World
        </h1>
        <h3 className="mt-2 text-sm italic sm:mt-4 sm:text-base md:text-lg lg:text-xl">
          Play for the best experience
        </h3>
        <PlayButton className="mt-4 sm:mt-6 md:mt-8" ref={playButtonRef} />
      </section>

      <section className="z-20 flex min-h-screen w-full flex-col items-start justify-center px-4 py-8 leading-tight sm:px-8 sm:leading-normal">
        <h1
          className="font-header text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7.2rem]"
          ref={header1Ref}
        >
          A Small Genesis
        </h1>
      </section>

      <section className="z-20 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 leading-tight sm:px-8 sm:leading-normal">
        <h1
          className="font-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl x-overflow:hidden"
          ref={header2Ref}
        >
          A Powerful Matter
        </h1>
      </section>
      <section className="z-20 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 leading-tight sm:px-8 sm:leading-normal">
        <h1 className="relative font-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl">
          The Light Within Us
        </h1>
      </section>
    </div>
  );
}

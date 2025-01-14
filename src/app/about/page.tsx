"use client"
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

  useEffect(() => {
    if (titleRef.current){
      gsap.to(titleRef.current, {
        text: "Enter the world of ACMx",
        duration: 1.5,
        delay: 0.7
      })
    }
  }, []);

  useEffect(() => {
    if (playButtonRef.current) {
      gsap.fromTo(playButtonRef.current, {
        opacity: 0,  
        y: 50,      
        duration: 2, 
        ease: "power2.out", 
      },{
        opacity: 1,
        y: 0,
        duration : 2,
        ease: "power2.out", 
      });
    }
  }, []);
  
  useEffect(() => {
    if (header1Ref.current) {
      gsap.to(header1Ref.current, {
        scrollTrigger: {
          trigger : header1Ref.current,
          start: "top center",
          end : "bottom top",
          scrub : true
        },
        x: 300,      
        ease: "none", 
      });
    }
  }, []);
  
  useEffect(() => {
    if (header2Ref.current) {
      gsap.fromTo(header2Ref.current, 
        {
          x: 400,  // Start from right
        },
        {
          x: 0,    // End at center (original position)
          scrollTrigger: {
            trigger: header2Ref.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
            markers: true
          },
          ease: "none",
        }
      );
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0D17] text-customWhite">
      <div className="fixed inset-0 z-0 h-full w-full">
        <StarsBackground />
        <ShootingStars />
      </div>
      <section className="h-screen z-20 flex flex-col justify-center items-center leading-tight sm:leading-normal px-4 text-center">
        <h1 className="font-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl" ref={titleRef}>Hello, World</h1>
        <h3 className="italic text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-4">Play for the best experience</h3>
        <PlayButton className="mt-4 sm:mt-6 md:mt-8" ref={playButtonRef}/>
      </section>

      <section className="min-h-screen w-full z-20 flex flex-col items-start justify-center leading-tight sm:leading-normal py-8 px-4 sm:px-8">
        <h1 className="font-header text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7.2rem]" ref={header1Ref}>A Small Genesis</h1>
      </section>

      <section className="min-h-screen w-full z-20 flex flex-col items-center justify-center leading-tight sm:leading-normal py-8 px-4 sm:px-8">
        <h1 className="relative font-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl" ref={header2Ref}>A Powerful Matter</h1>
      </section>
      <section className="min-h-screen w-full z-20 flex flex-col items-center justify-center leading-tight sm:leading-normal py-8 px-4 sm:px-8">
        <h1 className="relative font-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl">The Light Within Us</h1>
      </section>
    </div>
  );
}


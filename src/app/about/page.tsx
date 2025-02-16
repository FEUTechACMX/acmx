"use client";
import PlayButton from "~/components/ui/play-button";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { StarsBackground } from "~/components/ui/stars-background";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import TeamCards from "~/components/2024/about/TeamCards";
import Fragments from "~/components/2024/about/Fragments";
import AboutEventsTeam from "~/components/2024/about/EventsTeam";
import AboutCommittees from "~/components/2024/about/Committees";
import AboutForumsTeam from "~/components/2024/about/ForumsTeam";
import AboutTeam from "~/components/2024/about/AboutPageTeam";
import AboutCard from "~/components/2024/about/AboutCard";
import AboutACMX from "~/components/2024/about/AboutACMX";
import AboutMissionVision from "~/components/2024/about/AboutMissionVision";
import AboutSponsor from "~/components/2024/about/AboutSponsor";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import Link from "next/link";
import Orb from "~/components/2024/about/Orb";
import AboutFooter from "~/components/2024/about/AboutFooter";

export default function Home() {
  const titleRef = useRef(null);
  const playButtonRef = useRef(null);
  const header1Ref = useRef(null);
  const header2Ref = useRef(null);
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        text: "Enter the world of ACM",
        duration: 1.5,
        delay: 0.7,
      });
    }
    if (playButtonRef.current) {
      gsap.fromTo(
        playButtonRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.5 },
      );
    }
  }, []);

  useEffect(() => {
    const updateAnimation = () => {
      const viewportWidth = window.innerWidth; // viewporth
      const xValue = viewportWidth < 768 ? 100 : 300; // x-value will adjust according to the viewport width

      if (header1Ref.current) {
        gsap.to(header1Ref.current, {
          scrollTrigger: {
            trigger: header1Ref.current,
            start: "top center",
            end: "bottom top",
            scrub: true,
          },
          x: xValue,
          ease: "none",
        });
      }
    };

    updateAnimation();
    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("resize", updateAnimation);
    };
  }, []);

  useEffect(() => {
    const updateAnimation = () => {
      const viewportWidth = window.innerWidth;
      const xValue = viewportWidth < 768 ? 50 : 400;

      if (header2Ref.current) {
        gsap.fromTo(
          header2Ref.current,
          {
            x: xValue,
          },
          {
            x: 0,
            scrollTrigger: {
              trigger: header2Ref.current,
              start: "top bottom",
              end: "bottom center",
              scrub: true,
            },
            ease: "none",
          },
        );
      }
    };
    updateAnimation();
    window.addEventListener("resize", updateAnimation);
    return () => {
      window.removeEventListener("resize", updateAnimation);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[#0B0D17] text-customWhite">
      <div className="fixed inset-0 z-0 h-full w-full">
        <StarsBackground />
        <ShootingStars />

        <div className="flex h-[100vh] items-center justify-center">
          <Fragments />
        </div>
      </div>

      <section className="z-20 flex h-screen flex-col items-center justify-center px-4 text-center leading-tight sm:leading-normal">
        <h1
          className="font-boston-angel text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
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
          className="font-boston-angel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7.2rem]"
          ref={header1Ref}
        >
          A Small Genesis
        </h1>
      </section>

      <section className="z-20 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 leading-tight sm:px-8 sm:leading-normal">
        <h1
          className="x-overflow:hidden font-boston-angel text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
          ref={header2Ref}
        >
          A Powerful Matter
        </h1>
      </section>
      <section className="z-20 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 leading-tight sm:px-8 sm:leading-normal">
        <h1 className="relative font-boston-angel text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl">
          The Light Within Us
        </h1>
        <div className="mt-8 flex gap-8">
          <Orb />
        </div>
      </section>
      <section className="relative z-30 my-10 flex h-full min-h-40 w-full items-center justify-center px-4">
        <div className="relative max-w-6xl grid-cols-1 items-center gap-10">
          <div className="mb-10 flex w-full justify-center">
            <AboutACMX />
          </div>
          <div className="flex justify-center">
            <AboutMissionVision />
          </div>
        </div>
      </section>

      <section className="z-20 w-full flex-col px-4 py-8 leading-tight [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] sm:px-8 sm:leading-normal">
        <h2 className="mb-6 text-center text-3xl font-bold">Meet Our Team</h2>
        <div className="flex flex-col items-center gap-4">
          <Accordion type="multiple">
            <div className="self-start">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <TeamCards teamKey="about" />
                </AccordionTrigger>
                <AccordionContent>
                  <AboutTeam />
                </AccordionContent>
              </AccordionItem>
            </div>
            <div className="self-end">
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <TeamCards teamKey="events" />
                </AccordionTrigger>
                <AccordionContent>
                  <AboutEventsTeam />
                </AccordionContent>
              </AccordionItem>
            </div>
            <div className="self-start">
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <TeamCards teamKey="featured" />
                </AccordionTrigger>
                <AccordionContent>
                  <AboutForumsTeam />
                </AccordionContent>
              </AccordionItem>
            </div>
            <div className="self-end">
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <TeamCards teamKey="committees" />
                </AccordionTrigger>
                <AccordionContent>
                  <AboutCommittees />
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
        </div>
      </section>
      <section className="z-50 flex w-[100vw] items-center justify-center bg-[#020024] px-4 py-8 leading-tight sm:px-8 sm:leading-normal">
        <AboutFooter />
      </section>
      <div></div>
    </div>
  );
}

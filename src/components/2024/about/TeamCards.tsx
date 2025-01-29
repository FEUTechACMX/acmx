import Image from "next/image";
import { useState, useEffect } from "react";

const teams = {
  about: {
    name: "ABOUT",
    border: "/about/card/teamCard/teamDesign/aboutBorder.svg",
    design: "/about/card/teamCard/teamDesign/aboutX.svg",
    color: "#ff8bf8",
    logo: "about/navbar/about.svg",
  },
  featured: {
    name: "FEATURED",
    border: "/about/card/teamCard/teamDesign/featuredBorder.svg",
    design: "/about/card/teamCard/teamDesign/featuredX.svg",
    color: "#85ff92",
    logo: "about/navbar/featured.svg",
  },
  events: {
    name: "EVENTS",
    border: "/about/card/teamCard/teamDesign/eventsBorder.svg",
    design: "/about/card/teamCard/teamDesign/eventsX.svg",
    color: "#e96b61",
    logo: "about/navbar/events.svg",
  },
  committees: {
    name: "COMMITTEES",
    border: "/about/card/teamCard/teamDesign/CommitteesBorder.svg",
    design: "/about/card/teamCard/teamDesign/committeesX.svg",
    color: "#1dcdff",
    logo: "about/navbar/committees.svg",
  },
};

export default function TeamCards({ teamKey }) {
  const team = teams[teamKey] || { name: "Unknown", color: "#ffffff" }; // Default fallback
  const [width, setWidth] = useState(500.6);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth < 500.6 ? window.innerWidth : 500.6);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="group relative h-[247.33px] w-[500.6px] cursor-pointer select-none transition-transform duration-300 hover:scale-105"
      style={{ width: `${width}px` }}
    >
      <img
        className="absolute h-full w-full"
        src="/about/card/teamCard/teamCardBase.svg"
        alt="Base"
      />
      <img
        className="absolute h-full w-full group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        src={team.border}
        alt="Border"
      />
      <img
        className="absolute h-full w-full group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        src={team.design}
        alt="Design"
      />
      <div
        className="absolute flex h-full w-full items-center justify-around font-cascadia group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{ color: team.color }}
      >
        <div className="flex w-[20%] items-center justify-center">
          <Image
            className="m-[200]"
            src={team.logo}
            alt=""
            width={30}
            height={30}
          />
        </div>
        <div className="flex w-[80%] justify-center">
          <h1 className="text-2xl" style={{ color: team.color }}>
            {team.name}
          </h1>
        </div>
        <div className="flex w-[20%] items-center justify-center">
          <Image
            className="m-[200]"
            src={team.logo}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}

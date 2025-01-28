import Image from "next/Image";

const teams = {
  about: {
    name: "ABOUT",
    border: "/about/card/teamCard/teamDesign/aboutBorder.svg",
    design: "/about/card/teamCard/teamDesign/aboutX.svg",
    color: "#ff8bf8",
  },
  featured: {
    name: "FEATURED",
    border: "/about/card/teamCard/teamDesign/featuredBorder.svg",
    design: "/about/card/teamCard/teamDesign/featuredX.svg",
    color: "#85ff92",
  },
  events: {
    name: "EVENTS",
    border: "/about/card/teamCard/teamDesign/eventsBorder.svg",
    design: "/about/card/teamCard/teamDesign/eventsX.svg",
    color: "#e96b61",
  },
  committees: {
    name: "COMMITTEES",
    border: "/about/card/teamCard/teamDesign/CommitteesBorder.svg",
    design: "/about/card/teamCard/teamDesign/committeesX.svg",
    color: "#1dcdff",
  },
};

export default function TeamCards({ teamKey }) {
  const team = teams[teamKey] || { name: "Unknown" }; // Default fallback

  return (
    <div className="relative h-[247.33px] w-[500.6px]">
      <img
        className="absolute h-[247.33px] w-[500.6px]"
        src="/about/card/teamCard/teamCardBase.svg"
        alt=""
      />
      <img
        className="absolute h-[247.33px] w-[500.6px]"
        src={team.border}
        alt=""
      />
      <img
        className="absolute h-[247.33px] w-[500.6px]"
        src={team.design}
        alt=""
      />
      <div
        className="absolute flex h-full w-full items-center justify-center font-cascadia"
        style={{ color: team.color }}
      >
        <h1>{team.name}</h1>
      </div>
    </div>
  );
}

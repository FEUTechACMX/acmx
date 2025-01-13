import PlayButton from "~/components/ui/play-button";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { StarsBackground } from "~/components/ui/stars-background";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0D17] text-customWhite">
      <div className="fixed inset-0 z-0 h-full w-full">
        <StarsBackground />
        <ShootingStars />
      </div>
      <div className="z-20 text-center">
      <h1 className="font-header text-[3rem] lg:text-[7.2rem]">Enter the world of ACMX</h1>
        <PlayButton />
      </div>
    </div>
  );
}

"use client";
import UserProfile from "~/components/2024/about/DynamicPage";
import { gsap } from "gsap";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { StarsBackground } from "~/components/ui/stars-background";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[#0B0D17] text-customWhite">
      <div className="fixed inset-0 z-0 h-full w-full">
        <ShootingStars />
        <StarsBackground />
      </div>
      <UserProfile />
    </div>
  );
};

export default page;

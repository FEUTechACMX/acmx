"use client";
import { use } from "react";
import { useParams } from "next/navigation"; // Ensure you're using the correct hook
import { ShootingStars } from "~/components/ui/shooting-stars";
import { StarsBackground } from "~/components/ui/stars-background";
import UserProfile from "~/components/2024/about/DynamicPage";

function Page() {
  const params = useParams();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[#0B0D17] text-customWhite">
      <div className="fixed inset-0 z-0 h-full w-full">
        <ShootingStars />
        <StarsBackground />
      </div>
      <UserProfile />
    </div>
  );
}

export default Page;

import Head from "next/head";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { StarsBackground } from "~/components/ui/stars-background";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <audio loop autoPlay controls className="z-20" >
      <source src="/BackgroundMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="fixed inset-0 z-0 h-full w-full">

        <StarsBackground />
        <ShootingStars />
      </div>
    </div>
  );
}

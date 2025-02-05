import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Avatar() {
  return (
    <div className="avatar group flex h-[35vh] w-[35vh] flex-col items-center justify-center rounded-lg bg-slate-600">
      <img
        className="h-[50%] cursor-pointer rounded-full hover:scale-105"
        src="/about/pfp.png"
        alt=""
      />
      <h1 className="mt-10 font-cascadia">Kourai</h1>
    </div>
  );
}
function Links() {
  return (
    <div className="socials mt-5 h-[25vh] w-[90%] max-w-[400px] rounded-lg shadow-lg sm:w-[60%] md:w-[45%] lg:w-[25vw]">
      <div className="flex h-full w-full flex-col items-start justify-evenly">
        <img
          src="/about/profilepage/socialHud.png"
          className="absolute h-[25vh] w-[90vw] max-w-[400px] sm:w-[60%] md:w-[45%] lg:w-[25vw]"
          alt="Social HUD"
        />
        <div className="relative flex w-full items-center justify-between text-lg sm:text-xl md:text-2xl">
          <div className="ml-5 flex items-center gap-1">
            <img src="" alt="Github logo" className="h-6 w-6" />
            <h1>Github:</h1>
          </div>
          <h1 className="mr-5">Kourai930</h1>
        </div>
        <div className="flex w-full items-center justify-between text-lg sm:text-xl md:text-2xl">
          <div className="ml-5 flex items-center gap-1">
            <img src="" alt="LinkedIn logo" className="h-6 w-6" />
            <h1>LinkedIn:</h1>
          </div>
          <h1 className="mr-5">Kourai930</h1>
        </div>
        <div className="flex w-full items-center justify-between text-lg sm:text-xl md:text-2xl">
          <div className="ml-5 flex items-center">
            <img src="" alt="Facebook logo" className="h-6 w-6" />
            <h1>Facebook:</h1>
          </div>
          <h1 className="mr-5">Luigi Karl Limos</h1>
        </div>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="details h-auto w-[90%] max-w-[500px] overflow-hidden rounded-lg shadow-lg sm:w-[75%] md:w-[60%] lg:w-[55%]">
      <div className="flex h-full w-full flex-col items-start justify-evenly p-5 sm:p-8 md:p-10">
        <h2 className="text-lg text-white sm:text-xl md:text-2xl">
          Full Name: Luigi Karl B. Limos
        </h2>
        <p className="text-lg text-white sm:text-xl md:text-2xl">
          Role: Intern
        </p>
        <p className="text-lg text-white sm:text-xl md:text-2xl">
          Phone: 09456176976
        </p>
        <p className="text-lg text-white sm:text-xl md:text-2xl">
          Email: luigikarlblimos@gmail.com
        </p>
      </div>
      <img
        className="h-full w-full object-cover"
        src="/about/profilepage/info.png"
        alt="Profile"
      />
    </div>
  );
}

export default function UserProfile() {
  const [animationWidth, setAnimationWidth] = useState(0);

  // Function to get the animation width for centering
  function getAnimationWidth() {
    const frame = document.querySelector(".rightSide");
    if (!frame) return 0;
    let width = frame.offsetWidth;
    return window.innerWidth / 2 - width;
  }

  //Update the animationWidth on component mount and resize
  useEffect(() => {
    const updateWidth = () => {
      setAnimationWidth(getAnimationWidth());
    };

    updateWidth(); // Initial width calculation

    window.addEventListener("resize", updateWidth); // Listen for resize events

    return () => {
      window.removeEventListener("resize", updateWidth); // Cleanup listener
    };
  }, []);

  // GSAP animation for leftSide and rightSide
  useEffect(() => {
    const frame = document.querySelector(".rightSide");
    if (!frame) return;

    let width = frame.offsetWidth;
    let centerX = window.innerWidth / 2 - width / 2; // Calculate center
    let tl = gsap.timeline();
    tl.to(".leftSide", {
      x: -getAnimationWidth(),
      duration: 1,
      ease: "power2.out",
    })
      .to(
        ".rightSide",
        { x: getAnimationWidth(), duration: 1, ease: "power2.out" },
        0, // Sync both animations
      )
      .to(
        ".backgroundEffect",
        { duration: 1, scaleX: 1, ease: "power2.out" },
        0,
      )
      .to(".grids", { opacity: 1, ease: "power2.out", delay: 0.5 }, 0);
  }, [animationWidth]); // Re-run animation when animationWidth changes

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="backgroundEffect absolute inset-0 origin-center scale-x-0 bg-[radial-gradient(circle,rgba(0,255,255,0.2),rgba(0,0,0,0.8))]"></div>
      <div className="grids absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.2)),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.2))] bg-[size:50px_50px] opacity-0"></div>
      <div className="absolute h-[100vh] w-full">
        <div className="flex h-full w-full items-center justify-center sm:flex-col md:flex-row">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Avatar />
            <Links />
          </div>
        </div>
      </div>
      <div className="pageFrame absolute w-[100vw]">
        <div className="flex w-full justify-center">
          <img
            className="leftSide h-[100vh] w-[12%] min-w-[96px] scale-x-[-1] drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]"
            src="/about/profilepage/pageFrame.png"
            alt=""
          />
          <img
            className="rightSide h-[100vh] w-[12%] min-w-[96px] drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]"
            src="/about/profilepage/pageFrame.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

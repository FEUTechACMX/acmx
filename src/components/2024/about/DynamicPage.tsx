import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Avatar() {
  return (
    <div className="avatar group flex h-[40vh] w-[20vw] flex-col items-center justify-center rounded-lg bg-slate-600">
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
    <div className="socials relative h-[16.5vw] w-[25vw] rounded-lg">
      <div className="w-25w absolute flex h-[16.5vw] flex-col items-start justify-evenly p-10">
        <div className="flex w-[25vw] justify-evenly text-2xl">
          <div className="logo">
            <img src="" alt="" />
            <h1>Github: </h1>
          </div>
          <h1>Kourai930</h1>
        </div>
        <div className="flex w-[25vw] justify-evenly text-2xl">
          <div className="logo">
            <img src="" alt="" />
            <h1>LinkedIN: </h1>
          </div>
          <h1>Kourai930</h1>
        </div>
        <div className="flex w-[25vw] justify-evenly text-2xl">
          <div className="logo">
            <img src="" alt="" />
            <h1>Facebook: </h1>
          </div>
          <h1>Kourai930</h1>
        </div>
      </div>
      <img
        src="/about/profilepage/socialHud.png "
        className="absolute h-[16.5vw] w-[25vw]"
        alt=""
      />
      <img
        src="/about/profilepage/bars.png"
        className="absolute left-[1.35vw] w-[13.35vw]"
        alt=""
      />
    </div>
  );
}

function Info() {
  return (
    <div className="details relative h-[50%] w-[55%] rounded-lg">
      <div className="absolute flex h-full w-full flex-col items-start justify-evenly p-10">
        <h2 className="text-2xl text-white">full name: Luigi Karl B. Limos</h2>
        <p className="text-2xl text-white">Role: Intern</p>
        <p className="text-2xl text-white">Phone: 09456176976</p>
        <p className="text-2xl text-white">Email: luigikarlblimos@gmail.com</p>
      </div>
      <img className="h-full w-full" src="/about/profilepage/info.png" alt="" />
    </div>
  );
}

export default function UserProfile() {
  useEffect(() => {
    let tl = gsap.timeline();

    tl.to(".leftSide", {
      duration: 0.5,
      x: "-41vw",
      ease: "power2.out",
    })
      .to(
        ".rightSide",
        {
          duration: 0.5,
          x: "41vw",
          ease: "power2.out",
        },
        0,
      )
      .to(
        ".backgroundEffect", // Grow the background div
        {
          duration: 0.5,
          scaleX: 1, // Grow to full size
          ease: "power2.out",
        },
        0, // Start at the same time as leftSide & rightSide
      )

      .to(".grids", {
        opacity: 1,
        ease: "power2.out",
        delay: 0.5,
      });
  }, []);
  return (
    <div className="relative h-screen w-full">
      <div className="backgroundEffect absolute inset-0 origin-center scale-x-0 bg-[radial-gradient(circle,rgba(0,255,255,0.2),rgba(0,0,0,0.8))]"></div>
      <div className="grids absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.2)),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.2))] bg-[size:50px_50px] opacity-0"></div>
      <div className="absolute flex h-[100vh] w-[100vw] items-center justify-evenly">
        <div className="flex h-full flex-col items-center justify-evenly">
          <Avatar />
          <Links />
        </div>
        <Info />
      </div>
      <div className="pageFrame absolute flex w-[100vw]">
        <img
          className="leftSide absolute left-[41vw] h-[100vh] w-[9vw] scale-x-[-1]"
          src="/about/profilepage/pageFrame.png"
          alt=""
        />
        <img
          className="rightSide absolute left-[50vw] h-[100vh] w-[9vw]"
          src="/about/profilepage/pageFrame.png"
          alt=""
        />
      </div>
    </div>
  );
}

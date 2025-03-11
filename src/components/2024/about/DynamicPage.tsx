import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Facebook } from "lucide-react";
import users from "./TeamInfo";
import { profile } from "console";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

function Buttons({ handleNext, handlePrevious }) {
  return (
    <div className="absolute flex h-[15%] w-[90%] justify-between justify-self-end drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] md:w-[40vw] lg:h-[25vh]">
      <img
        className="leftButton h-full w-auto cursor-pointer"
        src="/about/profilepage/LeftButton.png"
        alt="previous"
        onClick={handlePrevious}
      />
      <img
        className="rightButton h-full w-auto cursor-pointer"
        src="/about/profilepage/RightButton.png"
        alt="necxt"
        onClick={handleNext}
      />
    </div>
  );
}
function Avatar({ name, profilePic }) {
  return (
    <div className="avatar group flex h-[35vh] w-[35vh] flex-col items-center justify-center rounded-lg bg-slate-600">
      <img
        className="h-[50%] cursor-pointer rounded-full hover:scale-105"
        src={profilePic}
        alt=""
      />
      <h1 className="mt-10 font-cascadia">{name}</h1>
    </div>
  );
}
function Links({ GitHub, LinkedIn, facebook }) {
  return (
    <div className="socials h-[40vh] w-full rounded-lg shadow-lg drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] sm:w-[60vw] md:w-[45vw]">
      <div className="socials flex h-[40vh] w-[90%] flex-col items-start justify-evenly">
        <img
          src="/about/profilepage/socialHud.png"
          className="absolute h-full w-full"
          alt="Social HUD"
        />
        <div className="flex w-full flex-col items-center justify-between text-lg md:flex-row md:text-xl">
          <div className="ml-10 flex items-center gap-1">
            <Github className="h-6-w-6" />
            <h1>Github:</h1>
          </div>
          <h1 className="">{GitHub}</h1>
        </div>
        <div className="flex w-full flex-col items-center justify-between text-lg md:flex-row md:text-xl">
          <div className="ml-10 flex items-center gap-1">
            <Linkedin className="h-6-w-6" />
            <h1>LinkedIn:</h1>
          </div>
          <h1 className="">{LinkedIn}</h1>
        </div>
        <div className="lg:text flex w-full flex-col items-center justify-between text-lg md:flex-row md:text-xl">
          <div className="ml-10 flex items-center">
            <Facebook className="h-6-w-6" />
            <h1>Facebook:</h1>
          </div>
          <h1 className="">{facebook}</h1>
        </div>
      </div>
    </div>
  );
}

function Info({ name, role, phoneNumber, email }) {
  return (
    <div className="details h-[40vh] w-[90%] rounded-lg shadow-lg drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] md:mt-10 md:w-[75%] lg:w-[55%]">
      <div className="relative flex h-[30vh] w-full flex-col items-center justify-evenly sm:p-8">
        <img
          className="absolute h-full w-full"
          src="/about/profilepage/info.png"
          alt="Profile"
        />
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h2 className="text-center">Full name:</h2>
          <h2 className="ml-2">{name}</h2>
        </div>
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h2 className="text-center">Role:</h2>
          <h2 className="ml-2">{role}</h2>
        </div>
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h2 className="">Phone number:</h2>
          <h2 className="ml-2">{phoneNumber}</h2>
        </div>
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <h2 className="">email:</h2>
          <h2 className="ml-2">{email}</h2>
        </div>
      </div>
    </div>
  );
}

export default function UserProfile({ userId }) {
  const [animationWidth, setAnimationWidth] = useState(0);

  // Find the user based on userId
  const member = users.find((m) => m.userId === userId);

  useEffect(() => {
    console.log("userId:", userId);
    console.log("users:", users);
  }, [userId]);

  // Ensure we wait for userId to be populated
  if (!userId || !member) {
    return <p className="text-center text-white">Loading...</p>;
  }

  const handleNext = () => {
    // Calculate the next member index in a circular manner
    const nextIndex =
      (users.findIndex((user) => user.userId === userId) + 1) % users.length;

    // Get the userId of the next member
    const nextUserId = users[nextIndex]?.userId;

    // Redirect to the next member's profile
    if (nextUserId) {
      window.location.href = `/about/${nextUserId}`;
    }
  };

  const handlePrevious = () => {
    // Calculate the previous member index in a circular manner
    const currentIndex = users.findIndex((user) => user.userId === userId);
    const prevIndex = (currentIndex - 1 + users.length) % users.length;

    // Get the userId of the previous member
    const prevUserId = users[prevIndex]?.userId;

    // Redirect to the previous member's profile
    if (prevUserId) {
      window.location.href = `/about/${prevUserId}`;
    }
  };

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
      .to(".grids", { opacity: 1, ease: "power2.out", delay: 0.5 }, 0)
      .to(".user", {
        opacity: 1,
        repeat: 2, // Blinks 3 times (repeat = 2 means 3 cycles)
        yoyo: true,
        duration: 0.1,
      })
      .to(".user", { opacity: 1, duration: 1.5, ease: "power2.out" });
  }, [animationWidth]); // Re-run animation when animationWidth changes

  useEffect(() => {});

  return (
    <section className="relative h-screen w-full select-none md:overflow-hidden">
      <div className="fixed inset-0">
        <div className="backgroundEffect absolute inset-0 origin-center scale-x-0 bg-[radial-gradient(circle,rgba(0,255,255,0.2),rgba(0,0,0,0.8))]"></div>
        <div className="grids absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.2)),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.2))] bg-[size:50px_50px] opacity-0"></div>
        <div className="pageFrame absolute w-[100vw] select-none">
          <div className="flex w-full justify-center">
            <img
              className="leftSide h-[100vh] w-[12%] min-w-[96px] scale-x-[-1] select-none drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]"
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
      </div>
      <div className="absolute flex h-[100vh] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth md:overflow-hidden">
        <div className="user flex h-[200vh] w-full flex-col items-center justify-between opacity-0 md:flex-row">
          {/* First Section (Snap Start) */}
          <div className="m-5 flex h-[100vh] w-[full] snap-start flex-col items-center justify-center md:w-[45vw]">
            <Avatar name={member?.userId} profilePic={member?.image} />
            <Buttons handleNext={handleNext} handlePrevious={handlePrevious} />
          </div>

          {/* Second Section (Snap Start) */}
          <div className="mt-5 flex h-[100vh] w-full snap-start flex-col items-center justify-evenly lg:w-[60vw]">
            <Info
              name={member?.name}
              role={member?.role}
              phoneNumber={member?.phoneNumber}
              email={member?.email}
            />
            <Links
              GitHub={member?.GitHub}
              facebook={member?.facebook}
              LinkedIn={member?.LinkedIn}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

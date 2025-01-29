import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/Image";
gsap.registerPlugin(ScrollTrigger);

const FragmentsAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      document
        .querySelectorAll(".innerFrag, .midFrag, .outerFrag")
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          const elementX = rect.left - containerRect.left + rect.width / 2;
          const elementY = rect.top - containerRect.top + rect.height / 2;

          const offsetX = elementX - centerX;
          const offsetY = elementY - centerY;

          gsap.fromTo(
            el,
            { x: 0, y: 0, opacity: 1 },
            {
              x: `+=${offsetX * 0.6}`, // Move outward slowly
              y: `+=${offsetY * 0.6}`, // Move outward slowly
              opacity: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "bottom top",
                end: "bottom bottom",
                scrub: 1.5,
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  //changes div size if innerWidth < 580px
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 580) {
        setScale(window.innerWidth / 580);
      } else {
        setScale(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check the initial window size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scaleImagePositions = (scale, t, l, w, h) => {
    return "left=${scale*{t}}";
  };

  return (
    <div
      ref={containerRef}
      className="relative z-30"
      style={{
        width: "580px",
        height: "580px",
        transform: `scale(${scale})`,
        overflow: "visible", // hide overflow for better performance when scaling down
      }}
    >
      <Image
        className="outerFrag absolute left-[433px] top-[363px]"
        src="/about/earth/Fragments/fragment37.png"
        alt="Fragment 37"
        width={115}
        height={136}
      />
      <Image
        className="outerFrag absolute left-[449px] top-[233px]"
        src="/about/earth/Fragments/fragment36.png"
        alt="Fragment 36"
        width={131}
        height={193}
      />
      <Image
        className="midFrag absolute left-[503px] top-[233px]"
        src="/about/earth/Fragments/fragment35.png"
        alt="Fragment 35"
        width={36}
        height={36}
      />
      <Image
        className="outerFrag absolute left-[464px] top-[95px]"
        src="/about/earth/Fragments/fragment34.png"
        alt="Fragment 34"
        width={112}
        height={159}
      />
      <Image
        className="outerFrag absolute left-[367px] top-[23px]"
        src="/about/earth/Fragments/fragment33.png"
        alt="Fragment 33"
        width={136}
        height={108}
      />
      <Image
        className="outerFrag absolute left-[339px] top-[444px]"
        src="/about/earth/Fragments/fragment32.png"
        alt="Fragment 32"
        width={157}
        height={104}
      />
      <Image
        className="midFrag absolute left-[324px] top-[295px]"
        src="/about/earth/Fragments/fragment31.png"
        alt="Fragment 31"
        width={167}
        height={183}
      />
      <Image
        className="midFrag absolute left-[367px] top-[166px]"
        src="/about/earth/Fragments/fragment30.png"
        alt="Fragment 30"
        width={145}
        height={157}
      />
      <Image
        className="midFrag absolute left-[300px] top-[71px]"
        src="/about/earth/Fragments/fragment29.png"
        alt="Fragment 29"
        width={175}
        height={139}
      />
      <Image
        className="midFrag absolute left-[342px] top-[31px]"
        src="/about/earth/Fragments/fragment28.png"
        alt="Fragment 28"
        width={49}
        height={60}
      />
      <Image
        className="outerFrag absolute left-[342px] top-[6px]"
        src="/about/earth/Fragments/fragment27.png"
        alt="Fragment 27"
        width={63}
        height={31}
      />
      <Image
        className="outerFrag absolute left-[271px] top-[448px]"
        src="/about/earth/Fragments/fragment26.png"
        alt="Fragment 26"
        width={151}
        height={132}
      />
      <Image
        className="midFrag absolute left-[280px] top-[422px]"
        src="/about/earth/Fragments/fragment25.png"
        alt="Fragment 25"
        width={59}
        height={58}
      />
      <Image
        className="innerFrag absolute left-[271px] top-[271px]"
        src="/about/earth/Fragments/fragment24.png"
        alt="Fragment 24"
        width={106}
        height={152}
      />
      <Image
        className="innerFrag absolute left-[231px] top-[131px]"
        src="/about/earth/Fragments/fragment23.png"
        alt="Fragment 23"
        width={157}
        height={172}
      />
      <Image
        className="midFrag absolute left-[220px] top-[37px]"
        src="/about/earth/Fragments/fragment22.png"
        alt="Fragment 22"
        width={114}
        height={117}
      />
      <Image
        className="outerFrag absolute left-[267px] top-[0px]"
        src="/about/earth/Fragments/fragment21.png"
        alt="Fragment 21"
        width={85}
        height={80}
      />
      <Image
        className="outerFrag absolute left-[155px] top-[0px]"
        src="/about/earth/Fragments/fragment20.png"
        alt="Fragment 20"
        width={139}
        height={91}
      />
      <Image
        className="outerFrag absolute left-[230px] top-[555px]"
        src="/about/earth/Fragments/fragment19.png"
        alt="Fragment 19"
        width={59}
        height={25}
      />
      <Image
        className="outerFrag absolute left-[184px] top-[499px]"
        src="/about/earth/Fragments/fragment18.png"
        alt="Fragment 18"
        width={110}
        height={75}
      />
      <Image
        className="midFrag absolute left-[227px] top-[466px]"
        src="/about/earth/Fragments/fragment17.png"
        alt="Fragment 17"
        width={62}
        height={82}
      />
      <Image
        className="outerFrag absolute left-[137px] top-[499px]"
        src="/about/earth/Fragments/fragment16.png"
        alt="Fragment 16"
        width={55}
        height={62}
      />
      <Image
        className="outerFrag absolute left-[106px] top-[507px]"
        src="/about/earth/Fragments/fragment15.png"
        alt="Fragment 15"
        width={39}
        height={33}
      />
      <Image
        className="midFrag absolute left-[121px] top-[480px]"
        src="/about/earth/Fragments/fragment14.png"
        alt="Fragment 14"
        width={54}
        height={32}
      />
      <Image
        className="midFrag absolute left-[103px] top-[478px]"
        src="/about/earth/Fragments/fragment13.png"
        alt="Fragment 13"
        width={45}
        height={42}
      />
      <Image
        className="midFrag absolute left-[69px] top-[308px]"
        src="/about/earth/Fragments/fragment12.png"
        alt="Fragment 12"
        width={191}
        height={204}
      />
      <Image
        className="innerFrag absolute left-[131px] top-[244px]"
        src="/about/earth/Fragments/fragment11.png"
        alt="Fragment 11"
        width={197}
        height={238}
      />
      <Image
        className="innerFrag absolute left-[111px] top-[164px]"
        src="/about/earth/Fragments/fragment10.png"
        alt="Fragment 10"
        width={145}
        height={113}
      />
      <Image
        className="midFrag absolute left-[53px] top-[323px]"
        src="/about/earth/Fragments/fragment9.png"
        alt="Fragment 9"
        width={44}
        height={70}
      />
      <Image
        className="midFrag absolute left-[54px] top-[183px]"
        src="/about/earth/Fragments/fragment8.png"
        alt="Fragment 8"
        width={94}
        height={150}
      />
      <Image
        className="outerFrag absolute left-[74px] top-[83px]"
        src="/about/earth/Fragments/fragment7.png"
        alt="Fragment 7"
        width={192}
        height={113}
      />
      <Image
        className="outerFrag absolute left-[93px] top-[37px]"
        src="/about/earth/Fragments/fragment6.png"
        alt="Fragment 6"
        width={88}
        height={93}
      />
      <Image
        className="outerFrag absolute left-[30px] top-[401px]"
        src="/about/earth/Fragments/fragment5.png"
        alt="Fragment 5"
        width={87}
        height={119}
      />
      <Image
        className="outerFrag absolute left-[8px] top-[348px]"
        src="/about/earth/Fragments/fragment4.png"
        alt="Fragment 4"
        width={74}
        height={73}
      />
      <Image
        className="outerFrag absolute left-[0px] top-[189px]"
        src="/about/earth/Fragments/fragment3.png"
        alt="Fragment 3"
        width={79}
        height={170}
      />
      <Image
        className="outerFrag absolute left-[19px] top-[116px]"
        src="/about/earth/Fragments/fragment2.png"
        alt="Fragment 2"
        width={79}
        height={85}
      />
      <Image
        className="outerFrag absolute left-[54px] top-[77px]"
        src="/about/earth/Fragments/fragment1.png"
        alt="Fragment 1"
        width={63}
        height={67}
      />
    </div>
  );
};

export default FragmentsAnimation;

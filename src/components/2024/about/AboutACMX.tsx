import Image from "next/image";

export default function AboutACMX() {
  return (
    <div className="z-40 flex h-[100vh] w-[100%] items-center justify-between rounded-md bg-black">
      <div className="flex h-[100%] w-[50%] flex-col justify-between px-20 py-40">
        <h1 className="text-center font-header text-8xl">
          What is Project ACMX?
        </h1>
        <p className="pt-4 text-justify text-4xl">
          Project ACMX is FEU Tech ACMs cutting-edge initiative focused on
          developing an innovative cross-platform application, designed to serve
          as the primary platform for information exchange and collaboration
          within the FEU Tech computer science community.
        </p>
      </div>
      <div className="w-[50%] px-10 py-10">
        <Image
          src="/about/aboutsection.jpg"
          alt="placeholder"
          width={100}
          height={100}
          className="h-[600px] w-full"
        />
      </div>
    </div>
  );
}

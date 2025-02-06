import Image from "next/image";

const Orb = () => {
  return (
    <div className="relative flex h-[200px] w-[200px] items-center justify-center">
      <div className="absolute">
        <Image
          src="/about/orb/Orb-min.png"
          alt="orb"
          width={100}
          height={100}
        />
      </div>
      <div className="absolute">
        <Image
          src="/about/orb/Ring1-min.png"
          alt="ring"
          width={200}
          height={200}
          className="animate-spin"
        />
      </div>
    </div>
  );
};

export default Orb;

import Image from "next/image";

const Orb = () => {
  return (
    <div className="relative flex h-[400px] w-[400px] items-center justify-center">
      <div className="absolute">
        <Image
          src="/about/orb/Orb-min.png"
          alt="orb"
          width={125}
          height={125}
          className="filter brightness-150 drop-shadow-[0_0_20px_#00FFFF]" 
        />
      </div>


      <div className="absolute">
        <Image
          src="/about/orb/Ring1-min.png"
          alt="ring"
          width={150}
          height={150}
          className="animate-spin filter brightness-200 drop-shadow-[0_0_30px_#00FFFF]"
        />
      </div>
      <div className="absolute">
        <Image
          src="/about/orb/Ring2-min.png"
          alt="ring"
          width={225}
          height={225}
          className="animate-spin filter brightness-200 drop-shadow-[0_0_40px_#00FFFF]"
        />
      </div>
      <div className="absolute">
        <Image
          src="/about/orb/Ring3-min.png"
          alt="ring"
          width={275}
          height={275}
          className="animate-spin filter brightness-200 drop-shadow-[0_0_50px_#00FFFF]"
        />
      </div>
    </div>
  );
};

export default Orb;

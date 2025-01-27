import Image from "next/Image";
export default function TeamCards() {
  return (
    <div className="relative h-[208.3px] w-[541.6px]">
      <Image
        className="absolute"
        src={"/about/card/teamCard/teamCardBase.svg"}
        alt="team card base "
        height={208.3}
        width={541.6}
      />
      <Image
        className="absolute"
        src={"/about/card/teamCard/teamCardBorder.svg"}
        alt="team card border "
        height={208.3}
        width={541.6}
      />
      <Image
        className="absolute"
        src={"/about/card/teamCard/TeamCardX.svg"}
        alt="team card top "
        height={208.3}
        width={541.6}
      />
      <div className="info absolute flex h-full w-full items-center justify-center">
        <h1>ACMX</h1>
      </div>
    </div>
  );
}

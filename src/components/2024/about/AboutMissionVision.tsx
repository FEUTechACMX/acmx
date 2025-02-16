import AboutCard from "./AboutCard";

export default function MissionVision() {
  return (
    <section className="flex justify-center items-center py-10 px-6">
      <AboutCard className="w-full max-w-3xl text-black" title="Mission & Vision" image="/about/GlitchingEarth 1.png">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold">Mission</h2>
            <p className="text-justify">
              To empower the FEU Tech computer science community through innovative technology and collaboration.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Vision</h2>
            <p className="text-justify">
              To become the leading platform for information exchange and collaboration in the FEU Tech community.
            </p>
          </div>
        </div>
      </AboutCard>
    </section>
  );
}

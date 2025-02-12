import AboutCard from "./AboutCard";

export default function MissionVision() {
  return (
    <section className="z-30 h-[100vh] w-[100vw] flex items-center justify-center bg-transparent">
      <AboutCard className="max-w-2xl" title="Mission & Vision" image="/about/GlitchingEarth 1.png">
        <div className="grid grid-cols-2 gap-8 text-gray-900 font-serif text-justify">
          <div>
            <h2 className="text-xl font-semibold">Mission</h2>
            <p className="text-lg">
              To empower the FEU Tech computer science community through
              innovative technology and collaboration.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Vision</h2>
            <p className="text-lg">
              To become the leading platform for information exchange and
              collaboration in the FEU Tech community.
            </p>
          </div>
        </div>
      </AboutCard>
    </section>
  );
}

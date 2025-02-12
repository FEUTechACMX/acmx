import AboutCard from "./AboutCard";

export default function AboutACMX() {
  return (
    <section className="z-30 h-[100vh] w-[100vw] flex items-center justify-center bg-transparent">
      <AboutCard className="max-w-xl p-8" title="What is Project ACMX?" image="/about/aboutsection.jpg">
        <p className="text-lg mb-2 font-serif justify-center text-justify">
          Project ACMX is FEU Tech ACM's cutting-edge initiative focused on
          developing an innovative cross-platform application, designed to serve
          as the primary platform for information exchange and collaboration
          within the FEU Tech computer science community.
        </p>
      </AboutCard>
    </section>
  );
}

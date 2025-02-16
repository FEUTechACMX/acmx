import AboutCard from "./AboutCard";

export default function AboutACMX() {
  return (
    <section className="mx-2 flex items-center justify-center rounded-3xl bg-[#0B1926] px-6 py-10 md:h-[50vh] md:w-[50vw] xl:h-[100vh] xl:w-[100vw]">
      <AboutCard
        className="h-full w-full text-black"
        title="What is Project ACMX?"
        image="/about/aboutsection.jpg"
      >
        <p className="text-justify text-lg">
          Project ACMX is FEU Tech ACM's cutting-edge initiative focused on
          developing an innovative cross-platform application, designed to serve
          as the primary platform for information exchange and collaboration
          within the FEU Tech computer science community.
        </p>
      </AboutCard>
    </section>
  );
}

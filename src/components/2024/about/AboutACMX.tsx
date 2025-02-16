import AboutCard from "./AboutCard";

export default function AboutACMX() {
  return (
    <section className="flex justify-center items-center py-10 px-6">
      <AboutCard className="w-full max-w-3xl text-black" title="What is Project ACMX?" image="/about/aboutsection.jpg">
        <p className="text-lg text-justify">
          Project ACMX is FEU Tech ACM's cutting-edge initiative focused on developing an innovative cross-platform 
          application, designed to serve as the primary platform for information exchange and collaboration within 
          the FEU Tech computer science community.
        </p>
      </AboutCard>
    </section>
  );
}

import { Badge } from "~/components/ui/badge";

export default function AboutContributor() {
  return (
    <section id="contributors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#8e44ad]">
          Contributors
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Emma Davis",
            "Frank Lee",
            "Grace Chen",
            "Henry Wilson",
            "Ivy Taylor",
            "Jack Robinson",
            "Kelly Nguyen",
            "Liam Parker",
            "Mia Johnson",
            "Noah Brown",
            "Olivia Martinez",
            "Paul Kim Pogi",
          ].map((contributor) => (
            <Badge key={contributor} variant="outline" className="text-sm">
              {contributor}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

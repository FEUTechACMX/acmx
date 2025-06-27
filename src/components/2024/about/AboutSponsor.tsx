import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";


export default function AboutSponsor() {
    return (
      <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8e44ad]">Our Sponsors</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                "TechCorp", "InnovateSoft", "FutureTech", "CodeMasters", "DataDynamics", "CloudNine", "CyberShield", "AIVentures",
              ].map((sponsor) => (
                <Card key={sponsor} className="flex items-center justify-center p-6">
                  <Badge variant="secondary" className="text-lg font-semibold">
                    {sponsor}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>
    );
}
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Github, Linkedin } from "lucide-react";



export default function AboutTeam() {
    return (
      <section id="team" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#8e44ad]">Our Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Alice Johnson", role: "Lead Developer", image: "/placeholder.svg?height=100&width=100" },
            { name: "Bob Smith", role: "Project Manager", image: "/placeholder.svg?height=100&width=100" },
            { name: "Carol Williams", role: "UX Designer", image: "/placeholder.svg?height=100&width=100" },
            { name: "David Brown", role: "Backend Engineer", image: "/placeholder.svg?height=100&width=100" },
          ].map((member) => (
            <Card key={member.name}>
              <CardContent className="flex flex-col items-center p-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
                <div className="flex space-x-2 mt-2">
                  <a href="#" className="text-gray-400 hover:text-[#8e44ad]">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#8e44ad]">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    );
}
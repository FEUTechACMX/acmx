"use client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Github, Linkedin } from "lucide-react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function AboutEventsTeam() {
  useEffect(() => {
    const cards = document.querySelectorAll(".team-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: 100,
          y: 100,
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.2)",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          boxShadow: "0 0 16px rgba(255, 255, 255, 0.2)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            once: true,
          },
        },
      );
    });
  }, []);

  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#8e44ad]">
          Our Team
        </h2>
        <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Alice Johnson",
              role: "Lead Developer",
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Bob Smith",
              role: "Project Manager",
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Carol Williams",
              role: "UX Designer",
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "David Brown",
              role: "Backend Engineer",
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "David Brown",
              role: "Backend Engineer",
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "David Brown",
              role: "Backend Engineer",
              image: "/placeholder.svg?height=100&width=100",
            },
          ].map((member) => (
            <Card key={member.name} className="team-card">
              <CardContent className="flex flex-col items-center p-6">
                <Avatar className="mb-4 h-24 w-24">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
                <div className="mt-2 flex space-x-2">
                  <a href="#" className="text-gray-400 hover:text-[#8e44ad]">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#8e44ad]">
                    <Linkedin className="h-5 w-5" />
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

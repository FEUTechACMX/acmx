"use client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Github, Linkedin } from "lucide-react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTeam() {
  useEffect(() => {
    const cards = document.querySelectorAll(".team-card");
    const cards2 = document.querySelectorAll(".team-card2");
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

    cards2.forEach((card, index) => {
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
        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {[
            {
              name: "Xynil Jhed Lacap",
              role: "Lead Developer",
              image: "/placeholder.svg?height=100&width=100",
              github: "mr-jones123",
              linkedin: "xynil-jhed-lacap-76ba9029a",
              /*

                Fullname: Xynil Jhed Lacap
                Email: xylacap@gmail.com
                Github: mr-jones123

              */
            },
            {
              name: "Arjhine A. Ty",
              role: "Lead Developer",
              image: "/placeholder.svg?height=100&width=100",
              github: "arrogance231",
              linkedin: "arrochi",

              /*

            Fullname: Arjhine A. Ty
            Email: arjhibe@gmail.com
            Phone: 09519647245
            GitHub: arrogance231

              */
            },
          ].map((member) => (
            <ul>
              <li>
                <Link href="/about/1">
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
                        <a
                          href={`https://github.com/${member.github}`}
                          className="text-gray-400 hover:text-[#8e44ad]"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        <a
                          href={`https://linkedin.com/in/${member.linkedin}`}
                          className="text-gray-400 hover:text-[#8e44ad]"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            </ul>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Luigi Karl B. Limos",
              role: "Project Developer",
              image: "/placeholder.svg?height=100&width=100",
              github: "Kourai9",
              linkedin: "luigi-karl-b-limos-0b377226b",
              /* Fullname: Luigi Karl B. Limos
                Email: luigikarlblimos@gmail.com
                Phone: 09456176976
                GitHub:	Kourai9*/
            },
            {
              name: "Raphael Andre Mercado",
              role: "Project Developer",
              image: "/placeholder.svg?height=100&width=100",
              github: "mercadoCoding",
              linkedin: "raphael-mercado-260464275",
              /*  Fullname: Raphael Andre Mercado
                  Email: raphaelandremercado@gmail.com 
                  Phone: 09394261614
                  GitHub: mercadoCODING*/
            },
            {
              name: "Ric Ian I. Barrios",
              role: "Project Developer",
              image: "/placeholder.svg?height=100&width=100",
              github: "Seedling",
              linkedin: "ric-ian-b-907278320/",

              /*
                Fullname:Ric Ian I. Barrios
                Email:ricbarrios45@gmail.com 
                Phone:09958440509
                GitHub:Seedling */
            },
            {
              name: "John Kerby P. Lola",
              role: "Project Developer",
              image: "/placeholder.svg?height=100&width=100",
              github: "OnTheBarProg",
              linkedin: "john-kerby-lola-2547b932a",
              /*
              Fullname: John Kerby P. Lola
              Email: john.kerby@hotmail.com
              Phone: 09569123977
              GitHub: OnTheBarProg*/
            },
          ].map((member) => (
            <Card key={member.name} className="team-card2">
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
                  <a
                    href={`https://github.com/${member.github}`}
                    className="text-gray-400 hover:text-[#8e44ad]"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    className="text-gray-400 hover:text-[#8e44ad]"
                  >
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

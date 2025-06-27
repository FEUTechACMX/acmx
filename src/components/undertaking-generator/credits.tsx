"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RocketIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "~/components/ui/button";

const teamMembers = [
    {
        name: "Sir Jeneffer Sabonsolin",
        position: "Adviser",
        image: "/members/24_25/sir_sabonsolin.jpg",
        linkedin: "https://www.linkedin.com/in/jeneffer-sabonsolin-70320329a",
    },
    {
        name: "Alpha Romer Coma",
        position: "Initiative Head",
        image: "/members/24_25/coma.jpg",
        linkedin: "https://www.linkedin.com/in/alpharomercoma",
    },
    {
        name: "Rab Karl Colasino",
        position: "Webmaster",
        image: "/members/24_25/colasino.jpg",
        linkedin: "https://www.linkedin.com/in/mr-colasino/",
    },
    {
        name: "Csypres Ornos",
        position: "President",
        image: "/members/24_25/ornos.jpg",
        linkedin: "https://www.linkedin.com/in/csypres-ornos-148528287",
    },
];

const SettingsComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCredits, setShowCredits] = useState(false);

    return (
        <>
            <p className="underline hover:text-primary cursor-pointer" onClick={() => setShowCredits(true)}>
                <RocketIcon className="h-4 w-4 inline" />
                Project ACMX Core Team
            </p>
            <AnimatePresence>
                {showCredits && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-transparent backdrop-blur-sm z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed inset-0 md:inset-10 bg-transparent rounded-lg shadow-lg overflow-auto"
                        >
                            <div className="p-6 w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Credits</h2>
                                    <Button variant="outline" className="" size="icon" onClick={() => setShowCredits(false)}>
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </Button>
                                </div>
                                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {teamMembers.map((member, index) => (
                                        <a href={member.linkedin} key={index} className="flex border flex-col items-center p-4 rounded-lg">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                width={100}
                                                height={100}
                                                className="rounded-full mb-4"
                                            />
                                            <h3 className="text-lg font-semibold text-center">{member.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-2 text-balance text-center">{member.position}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SettingsComponent;
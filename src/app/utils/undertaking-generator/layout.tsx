import "~/styles/2023.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Undertaking Generator | ACM-X",
    description: "Generate undertakings in seconds for CS courses at FEU Institute of Technology",
};

export default function Layout2023({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return children;
}

import "~/styles/2023.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Create T3 App",
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Layout2023({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return children;
}

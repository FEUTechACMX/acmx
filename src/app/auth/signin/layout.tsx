import "~/styles/2024.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Signin | ACM-X",
    description: "Sign in to access your account",
};

export default function Layout2023({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return children;
}

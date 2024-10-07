import "~/styles/2024.css";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "About | ACM-X",
    description: "About ACM-X",
};

export default function Layout2024({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>; // Ensure it's wrapped properly with fragments or div
}
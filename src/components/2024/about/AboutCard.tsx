import { ReactNode } from "react";
import Image from "next/image";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  image?: string;
}

export default function AboutCard({ children, className = "", title, image }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg p-6 bg-gray-100 transition-transform duration-300 ease-in-out transform hover:scale-105 font-boston-angel ${className}`}
    >
      {image && (
        <div className="relative w-full h-48 rounded-t-xl rounded-b-xl overflow-hidden">
          <Image
            src={image}
            alt="Card Background"
            fill
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-4">
        {title && <h1 className="text-2xl font-bold mb-2 text-gray-900 ">{title}</h1>}
        <p className="text-gray-900">{children}</p>
      </div>
    </div>
  );
}
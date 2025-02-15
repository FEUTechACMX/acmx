import { useState } from "react";
import { ReactNode } from "react";
import Image from "next/image";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  image?: string;
}

export default function AboutCard({ children, className = "", title, image }: CardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const x = (e.clientX - centerX) / 25; 
    const y = (centerY - e.clientY) / 25;

    setRotateX(y);
    setRotateY(x);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`relative flex flex-col rounded-3xl shadow-xl bg-gradient-to-b from-gray-700 via-[#0B0D17] to-black overflow-hidden 
                  transition-transform duration-300 ease-out transform hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] 
                  w-full md:w-[500px] h-[400px] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image src={image} alt="Card Background" fill className="object-cover w-full h-full" />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {title && <h1 className="text-2xl font-bold mb-2 text-gray-100">{title}</h1>}
        <p className="text-gray-100 flex-1">{children}</p>
      </div>
    </div>
  );
}
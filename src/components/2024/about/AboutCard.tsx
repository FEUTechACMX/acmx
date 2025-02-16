import { useState } from "react";
import { ReactNode } from "react";
import Image from "next/image";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  image?: string;
}

export default function AboutCard({
  children,
  className = "",
  title,
  image,
}: CardProps) {
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
      className={`relative flex transform flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-gray-700 via-[#0B0D17] to-black shadow-xl transition-transform duration-300 ease-out hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] xl:h-full xl:w-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      {image && (
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={image}
            alt="Card Background"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between p-6">
        {title && (
          <h1 className="mb-2 text-2xl font-bold text-gray-100">{title}</h1>
        )}
        <p className="flex-1 text-gray-100">{children}</p>
      </div>
    </div>
  );
}

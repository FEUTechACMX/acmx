import { navLinks } from "./index";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="w-[100vw]">
      <nav className="absolute top-0 z-40 w-full bg-navcol">
        <div className="flex w-full justify-stretch px-4 py-3">
          <div className="flex w-full items-center justify-start">
            <Image
              src="/about/navbar/FEUlogo.svg"
              width={20}
              height={10}
              className="xl:h-[40px] xl:w-[40px]"
              alt="ACMX Logo"
            />
            <Image
              src="/about/navbar/ACMlogo.svg"
              width={30}
              height={30}
              className="xl:h-[40px] xl:w-[40px]"
              alt="ACMX Logo"
            />
            <span className="ml-1 text-center font-boston-angel text-lg font-bold text-customWhite xl:text-xl">
              Feu TECH ACM
            </span>
          </div>
          <div className="flex w-full items-center justify-center font-boston-angel font-bold max-md:hidden">
            <ul className="flex md:gap-10 xl:gap-20">
              {navLinks.map((item) => (
                <li key={item.name} className="flex items-center">
                  <a href={item.href} className="flex items-center gap-1">
                    <Image
                      src={item.image}
                      width={19}
                      height={15}
                      className="xl:h-[17px] xl:w-[17px]"
                      alt={item.name}
                    />
                    <span className="text-center text-white">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full items-center justify-end max-md:hidden xl:mr-10">
            <button className="h-[34] w-[99px] rounded-lg bg-black py-[5px] font-boston-angel text-white">
              Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

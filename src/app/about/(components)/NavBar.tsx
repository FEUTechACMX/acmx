import { navLinks } from "./index";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container mx-auto flex items-center justify-between bg-[#0B0D17] px-4 py-3">
          <div className="text-center text-xl font-bold text-gray-400">
            placeholder
          </div>
          <ul className="relative flex flex-1 items-center justify-center gap-10 font-header font-bold max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-white hover:text-gray-700">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <button className="hidden max-lg:block">Sign In</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

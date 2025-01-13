import { navLinks } from "./index";


const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center bg-[#0B0D17]">
          <div className="text-xl font-bold text-gray-400 text-center">
            placeholder
          </div>
          <ul className="flex-1 flex justify-center items-center gap-10 max-lg:hidden font-boston-angel font-bold relative">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-white hover:text-gray-700"
                >
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

import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export default function Header() {
  const [dropdown, setDropdown] = useState(false);

  const showDropdown = (e) => {
    e.preventDefault();

    setDropdown(!dropdown);
  };
  return (
    <header className="w-full p-2">
      <div className="container mx-auto flex flex-col justify-between p-3 md:flex-row md:items-center">
        <div className="flex flex-grow items-center justify-between">
          <h1 className="text-3xl font-bold">
            <span className="text-violet-400">Paket</span>Tracker
          </h1>

          <button
            className="rounded-lg border-2 border-transparent p-1 focus:border-violet-300 md:hidden"
            onClick={showDropdown}
          >
            {!dropdown ? (
              <MenuIcon className="h-6" />
            ) : (
              <XIcon className="h-6" />
            )}
          </button>
        </div>
        <ul
          className={`mt-5 ${
            dropdown ? "flex" : "hidden"
          } flex-col space-y-3 md:mt-0 md:flex md:flex-row md:items-center md:space-y-0 md:space-x-12`}
        >
          <li className="nav-link text-violet-500">Home</li>
          <li className="nav-link">Cek Ongkir</li>
          <li className="nav-link">About</li>
        </ul>
      </div>
    </header>
  );
}

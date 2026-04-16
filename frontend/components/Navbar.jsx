import React, { useState } from "react";
import download from "../src/assets/download.png";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = ({ user }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="bg-white shadow-xl border-b-2 border-white">
      <div className="mx-auto py-4 px-3 flex items-center justify-between gap-2 relative">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={download} alt="Download App" className="h-8 w-16" />
          <span className="text-xl font-bold text-red-500">Pinterest</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-500 hover:text-red-500">
              Home
            </Link>

            <Link to="/create" className="text-gray-500 hover:text-red-500">
              Create
            </Link>

            <Link
              to="/yt"
              className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-red-500"
            >
              {user.name.slice(0, 1).toUpperCase()}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenu(!menu)} className="text-2xl">
            {menu ? <IoCloseOutline /> : <IoIosMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menu && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 z-50 transition-all duration-300">
            
            <Link
              to="/"
              onClick={() => setMenu(false)}
              className="text-gray-500 hover:text-red-500"
            >
              Home
            </Link>

            <Link
              to="/create"
              onClick={() => setMenu(false)}
              className="text-gray-500 hover:text-red-500"
            >
              Create
            </Link>

            <Link
              to="/yt"
              onClick={() => setMenu(false)}
              className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-red-500"
            >
              {user.name.slice(0, 1).toUpperCase()}
            </Link>

          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
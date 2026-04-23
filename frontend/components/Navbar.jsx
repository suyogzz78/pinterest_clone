import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import logo from "../src/assets/logo.png"

const Navbar = ({ user }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className=" bg-gradient-to-r from-black via-zinc-900 via-50% to-pink-700 border-b border-pink-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between gap-2 relative">
        
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Download App" className="h-12 w-20" />
          <span className="text-xl font-bold text-red-500 group-hover:text-red-400 transition">
            Pinterest
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-red-100 transition duration-200 font-medium"
            >
              Home
            </Link>

            <Link 
              to="/create" 
              className="text-gray-300 hover:text-red-100 transition duration-200 font-medium"
            >
              Create
            </Link>

            <Link
              to="/account"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white flex items-center justify-center hover:scale-105 transition transform font-semibold shadow-lg"
            >
              {user?.name?.slice(0, 1).toUpperCase() || "U"}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMenu(!menu)} 
            className="text-2xl text-white hover:text-red-500 transition"
          >
            {menu ? <IoCloseOutline /> : <IoIosMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menu && (
          <div className="absolute top-16 left-0 w-full bg-zinc-900 border-b border-zinc-800 shadow-2xl flex flex-col items-center gap-5 py-6 z-50 transition-all duration-300">
            
            <Link
              to="/"
              onClick={() => setMenu(false)}
              className="text-gray-300 hover:text-red-500 transition duration-200 font-medium text-lg"
            >
              Home
            </Link>

            <Link
              to="/create"
              onClick={() => setMenu(false)}
              className="text-gray-300 hover:text-red-500 transition duration-200 font-medium text-lg"
            >
              Create
            </Link>

            <Link
              to="/account"
              onClick={() => setMenu(false)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white flex items-center justify-center hover:scale-105 transition transform font-semibold shadow-lg"
            >
              {user?.name?.slice(0, 1).toUpperCase() || "U"}
            </Link>

          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
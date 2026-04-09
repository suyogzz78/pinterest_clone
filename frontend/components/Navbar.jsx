import React from "react";
import download from "../src/assets/download.png";
import { Link } from "react-router-dom";


const Navbar = ({user}) => {
  return (
    <div className="bg-white shadow-xl">
      <div className=" mx-auto py-4 px-3 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={download} alt="Download App" className="h-8 w-16" />

          <span className="text-xl font-bold text-red-500 ">Pinterest</span>
        </Link>

        <div className="flex items-center gap-4">

        <Link to="/" className="text-gray-500 hover:text-red-500">
          Home
        </Link>
        <Link to="/create" className="text-gray-500 hover:text-red-500">
          Create
        </Link>

        <Link to="/account" className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-red-500">
          {user.name.slice(0, 1).toUpperCase()}
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

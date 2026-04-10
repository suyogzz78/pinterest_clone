import React from "react";
import { Link } from "react-router-dom";

const Pincard = ({ pin }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3">
      <div className="bg-white rounded-lg overflow-hidden shadow-md relative group">
        <img src={pin.image} alt={pin.title} />

        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
            <Link to={`/pins/${pin._id}`} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                View Details
              </Link>
                </div>

        </div>
      </div>
    </div>
  );
};

export default Pincard;

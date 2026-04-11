import React from "react";
import { Link } from "react-router-dom";

const Pincard = ({ pin }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative group cursor-pointer">
        {/* Image Container */}
        <div className="relative w-full overflow-hidden bg-gray-200">
          <img
            src={pin.image.url}
            alt={pin.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x400?text=No+Image";
            }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex  items-center ">
            <Link
              to={`/pin/${pin._id}`}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pincard;

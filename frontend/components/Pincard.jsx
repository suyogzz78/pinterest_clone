import React from "react";
import { Link } from "react-router-dom";

const Pincard = ({ pin }) => {
  return (
    <div className="w-full bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-pink-900/30 hover:shadow-lg transition-all duration-300 relative group cursor-pointer">
      {/* Image — no fixed height, natural aspect ratio */}
      <div className="relative w-full overflow-hidden bg-zinc-800">
        <img
          src={pin?.image?.url}
          alt={pin?.title}
          className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
          }}
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 px-3">
        <p className="text-white font-semibold text-sm text-center line-clamp-2">
          {pin?.title}
        </p>
        <Link
          to={`/pin/${pin?._id}`}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-5 rounded-full transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Pincard;
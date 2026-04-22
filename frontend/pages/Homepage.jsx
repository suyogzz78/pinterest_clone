import React from "react";
import { usePins } from "../context/PinContext";
import { Loading2 } from "../components/Loading";
import Pincard from "../components/Pincard";

const Homepage = () => {
  const { pins, loading } = usePins();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-950">
        <Loading2 />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-600 opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 [column-fill:_balance]">
          {pins.map((pin) => (
            <div key={pin._id} className="break-inside-avoid mb-3">
              <Pincard pin={pin} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
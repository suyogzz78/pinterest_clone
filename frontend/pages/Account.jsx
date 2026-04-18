import React from "react";
import { useUser } from "../context/UserContext";
import { usePins } from "../context/PinContext";
import Pincard from "../components/Pincard";
import axios from "axios";


const Account = () => {
  const { user, loading,logout } = useUser();
  const { pins } = usePins();

  let userpins;
  if (pins) {
    userpins = pins.filter((pin) => pin.owner === user._id);
  }

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const logoutHandler = () => {
    logout();

  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-600 opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-700 opacity-10 blur-[100px] rounded-full pointer-events-none" />

      {/* Page wrapper */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile card */}
        <div className="flex justify-center mb-14">
          <div className="flex flex-col items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-10 py-8 shadow-xl">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-pink-900/40">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* Name */}
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              {user?.name?.toUpperCase()}
            </h1>

            {/* Meta */}
            <div className="flex gap-6 text-sm text-gray-400">
              <span>
                <span className="text-white font-semibold">
                  {user?.followers?.length || 0}
                </span>{" "}
                Followers
              </span>
              <span className="text-white/20">|</span>
              <span>{user?.email}</span>
            </div>

            <button
              className="mt-1 px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all rounded-full text-sm font-semibold shadow-md shadow-pink-900/40"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Section title */}
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-200">Your Pins</h2>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-sm text-gray-500">
            {userpins?.length || 0} pins
          </span>
        </div>

        {/* Pins grid — masonry-style with proper column widths */}
        {userpins && userpins.length > 0 ? (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
            {userpins.map((e) => (
              <div key={e._id} className="break-inside-avoid mb-3">
                <Pincard pin={e} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">📌</div>
            <p className="text-gray-400 text-lg font-medium">No pins yet</p>
            <p className="text-gray-600 text-sm mt-1">
              Your saved pins will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;

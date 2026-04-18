

import React from "react";

import { useUser } from "../context/UserContext";

const Account = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-600 opacity-20 blur-[120px] rounded-full"></div>

      <div className="flex justify-center items-center py-6 mt-10">
        <div className="flex flex-col gap-2">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="text-2xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mt-3">
            {user?.name?.toUpperCase()}
          </div>

          <div className="text-md font-semibold text-gray-500">
            Followers : {user?.followers?.length || 0}
          </div>

          <div className="text-md font-semibold text-gray-500">
            Email : {user?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

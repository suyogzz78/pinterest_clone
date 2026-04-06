import React from "react";
import { Link } from "react-router-dom";
import download from "../src/assets/download.png";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 shadow-lg">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ">
        <div className="flex justify-center mb-4">
          <img src={download} className="h-12" />
        </div>

        <div className="text-2xl font-semibold text-center">
          Login to your account
        </div>
     

      <form>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Email
        </label>

        <input
          type="email"
          id="email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-500"
          
        />

         <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-500"
         
        />

        <button type = "submit" className="commonbtn">
          Login
        </button>
      </form>

      </div> 
    </div>
  );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import download from "../src/assets/download.png";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submithandler = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 shadow-lg">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ">
        <div className="flex justify-center mb-4">
          <img src={download} className="h-12" />
        </div>

        <div className="text-2xl font-semibold text-center">
          Login to your account
        </div>

        <form onSubmit={submithandler}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-500"
          />

          <button type="submit" className="commonbtn">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="text-center mt-4 ">
            <span>
              Not yet on Pinterest?
              <Link
                to="/register"
                className="font-medium text-gray-400 hover:underline hover:text-red-500 "
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

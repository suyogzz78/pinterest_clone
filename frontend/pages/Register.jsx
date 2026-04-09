
import React from "react";
import { Link } from "react-router-dom";
import download from "../src/assets/download.png";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

const Register = () => {
    const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const {RegisterUser,btnloading} = useUser();

  const navigate = useNavigate();
  const submithandler = (e) => {
    e.preventDefault(); 
    console.log("Email:", email);
    console.log("Password:", password);

    RegisterUser(name,email,password,navigate); 


  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 shadow-lg">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ">
        <div className="flex justify-center mb-4">
          <img src={download} className="h-12" />
        </div>

        <div className="text-2xl font-semibold text-center">
          Register for an account
        </div>

        <form onSubmit={submithandler}>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Name
          </label>

          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-500"
          />
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

          <button type="submit" className="commonbtn" disabled={btnloading}>
            {btnloading ? <Loading /> : "Register"}
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
                Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-gray-400 hover:underline hover:text-red-500 "
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Register






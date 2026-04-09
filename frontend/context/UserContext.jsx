import { createContext, useContext, useEffect } from "react";

import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [btnloading, setbtnLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function RegisterUser(name, email, password, navigate) {
    // Implementation for registration logic

    setbtnLoading(true);
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      }); // Assuming the response contains user data and a token
      setUser(data.user); // Store user data in state
      setIsAuthenticated(true); // Set authentication status to true
      setbtnLoading(false); // Set loading to false after successful registration
      toast.success(data.message); // Show success toast
      navigate("/"); // Redirect to homepage after successful login
    } catch (error) {
      toast.error(
        "Registration failed. Please check your credentials and try again.",
      );
      setbtnLoading(false); // Set loading to false after failed registration
    }
  }
  async function LoginUser(email, password, navigate) {
    // Implementation for login logic

    setbtnLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      }); // Assuming the response contains user data and a token
      setUser(data.user); // Store user data in state
      setIsAuthenticated(true); // Set authentication status to true
      setbtnLoading(false); // Set loading to false after successful login
      toast.success(data.message); // Show success toast
      navigate("/"); // Redirect to homepage after successful login
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      setbtnLoading(false); // Set loading to false after failed login
    }
  }

  const [loading, setloading] = useState(true);

  async function fetchuser() {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data); // Store user data in state
      setIsAuthenticated(true); // Set authentication status to true
      setloading(false);
    } catch (err) {
      setloading(false);
      console.error("Error fetching user data:", err);
    }
  }

  useEffect(() => {
    fetchuser(); //
  }, []);

  return (
    <UserContext.Provider
      value={{
        LoginUser,
        RegisterUser,
        user,
        btnloading,
        isAuthenticated,
        loading,
        isAuthenticated,
        user,
      }}
    >
      {children}

      <Toaster />
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

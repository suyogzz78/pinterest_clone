// frontend/src/context/UserContext.jsx
import { createContext, useContext, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import axios from "../utils/axiosConfig"; // Use the configured axios instance

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [btnloading, setbtnLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setloading] = useState(true);

  async function RegisterUser(name, email, password, navigate) {
    setbtnLoading(true);
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      setUser(data.user);
      setIsAuthenticated(true);
      setbtnLoading(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      setbtnLoading(false);
    }
  }

  // async function LoginUser(email, password, navigate) {
  //   setbtnLoading(true);
  //   try {
  //     const { data } = await axios.post("/api/users/login", {
  //       email,
  //       password,
  //     });
  //     setUser(data.user);
  //     setIsAuthenticated(true);
  //     setbtnLoading(false);
  //     toast.success(data.message);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast.error(error.response?.data?.message || "Login failed");
  //     setbtnLoading(false);
  //   }
  // }

  // async function fetchuser() {
  //   try {
  //     const { data } = await axios.get("/api/users/me");
  //     setUser(data);
  //     setIsAuthenticated(true);
  //   } catch (err) {
  //     console.error("Error fetching user:", err);
  //     setUser(null);
  //     setIsAuthenticated(false);
  //   } finally {
  //     setloading(false);
  //   }
  // }

  // frontend/src/context/UserContext.jsx
  async function LoginUser(email, password, navigate) {
    setbtnLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      // data.user should now be without password
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setbtnLoading(false);
    }
  }

  async function fetchuser() {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data); // data is the user object
      setIsAuthenticated(true);
    } catch (err) {
      // Only show error for non-401 status codes
      if (err.response?.status !== 401) {
        console.error("Error fetching user:", err);
      }
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setloading(false);
    }
  }

  async function logout() {
    try {
      await axios.get("/api/users/logout");
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  async function followButton(userid) {
    try {
      await axios.post(`/api/users/follow/${userid}`);
      toast.success("Followed successfully");
    } catch (error) {
      toast.error("Error ");
    }
  }
  useEffect(() => {
    fetchuser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        LoginUser,
        RegisterUser,
        logout,
        user,
        btnloading,
        isAuthenticated,
        loading,
        followButton,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

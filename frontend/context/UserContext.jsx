// frontend/src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "../utils/axiosConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [btnloading, setBtnLoading] = useState(false);
  const [followbtnloading, setFollowBtnLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  async function RegisterUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password },
        { withCredentials: true }
      );

      setUser(data.user);
      setIsAuthenticated(true);

      toast.success(data.message);
      navigate("/");

      // sync auth state properly
      await fetchuser();
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // ---------------- LOGIN ----------------
  async function LoginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      setUser(data.user);
      setIsAuthenticated(true);

      toast.success(data.message);
      navigate("/");

      // IMPORTANT: sync backend state
      await fetchuser();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // ---------------- FETCH USER ----------------
  async function fetchuser() {
    try {
      const { data } = await axios.get("/api/users/me", {
        withCredentials: true,
      });

      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);

      if (err.response?.status !== 401) {
        console.error("Fetch user error:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  // ---------------- LOGOUT ----------------
  async function logout() {
    try {
      await axios.get("/api/users/logout", {
        withCredentials: true,
      });

      setUser(null);
      setIsAuthenticated(false);

      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  }


  async function followButton(userid) {
    setFollowBtnLoading(true);

    try {
      const { data } = await axios.post(
        `/api/users/follow/${userid}`,
        {},
        { withCredentials: true }
      );

      toast.success(data.message);

      // refresh user (followers/following update)
      await fetchuser();

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Follow failed");
      throw error;
    } finally {
      setFollowBtnLoading(false);
    }
  }


  useEffect(() => {
    fetchuser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        btnloading,
        followbtnloading,
        RegisterUser,
        LoginUser,
        logout,
        followButton,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
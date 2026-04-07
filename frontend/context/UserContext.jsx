
import { createContext, useContext } from "react";

import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";


const UserContext = createContext();


export const UserProvider = ({ children }) => {

const [user,setUser] = useState([]);
const [loading,setLoading] = useState(false);
const [isAuthenticated,setIsAuthenticated] = useState(false);
    async function LoginUser(email, password, navigate) {
      // Implementation for login logic
      setLoading(true);
        try{

            const { data } = await axios.post("/api/users/login", { email, password });// Assuming the response contains user data and a token
            setUser(data.user); // Store user data in state
            setIsAuthenticated(true); // Set authentication status to true
            setLoading(false); // Set loading to false after successful login
            toast.success("Login successful!"); // Show success toast
            navigate("/"); // Redirect to homepage after successful login

        }

        catch(error){
            toast.error("Login failed. Please check your credentials and try again.");
            setLoading(false); // Set loading to false after failed login
        }
   
   
    }

  return (
    <UserContext.Provider value={{ LoginUser , user, loading, isAuthenticated }}>

      {children}

      <Toaster/>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
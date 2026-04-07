import { createContext, useContext } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={{ user: "suyog" }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for easier access
export const useUser = () => useContext(UserContext);
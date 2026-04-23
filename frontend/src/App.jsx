import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useUser } from "../context/UserContext";
import { Loading2 } from "../components/Loading";
import Navbar from "../components/Navbar";
import CreatePage from "../pages/CreatePage";
import Pinpage from "../components/Pinpage";
import Account from "../pages/Account";

function App() {
  const { user, isAuthenticated, loading } = useUser();

  return loading ? (
    <Loading2 />
  ) : (
    <BrowserRouter>
      {isAuthenticated && <Navbar user={user} />}{" "}
      {/* Show Navbar only when authenticated */}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Login />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Homepage /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Homepage /> : <Register />}
        />
        <Route
          path="/pin/:id"
          element={isAuthenticated ? <Pinpage /> : <Login />}
        />
        <Route
          path="/create"
          element={isAuthenticated ? <CreatePage /> : <Login />}
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

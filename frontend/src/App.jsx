import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/login";
import Register from "../pages/Register";
import { useUser } from "../context/UserContext";
import { Loading2 } from "../components/Loading";




function App() {
  const { user, isAuthenticated, loading } = useUser();

  return loading ? (
    <Loading2 />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Login />} />
        <Route path="/login" element={isAuthenticated ? <Homepage /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Homepage /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
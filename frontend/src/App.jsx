import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/login";
import Register from "../pages/Register";
import { useUser } from "../context/UserContext";

function App() {
  const { user } = useUser(); // Now this will work
  console.log(user); // should log "suyog"

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
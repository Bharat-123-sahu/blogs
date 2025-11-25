import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemContent } from "./pages/page";
import Login from "./components/loginpage";
import Signup from "./components/signup";
import { Formcontroller } from "./components/form";
import { ProtectedRoutes } from "./protectes";

// import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ItemContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/addpost"
            element={
              <ProtectedRoutes>
                <Formcontroller />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

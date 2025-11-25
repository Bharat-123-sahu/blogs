import react from "react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
export const ProtectedRoutes = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

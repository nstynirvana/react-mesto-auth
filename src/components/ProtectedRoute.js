import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...props }) => {
  return props.isLoggedIn ? <Element {...props} /> : <Navigate to="/sign-in" />
};

export default ProtectedRoute;

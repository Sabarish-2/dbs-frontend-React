import React, { useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";
import AdminComponent from "./AdminComponent";

const RouteCheckComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("userId") !== null);
  const [admin, setAdmin] = useState(sessionStorage.getItem("Admin") === "Yes");
  if (admin) return <AdminComponent />;
  if (loggedIn) return children;
  return <LoginComponent />;
};

export default RouteCheckComponent;

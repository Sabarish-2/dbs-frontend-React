import React, { useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";
import AdminComponent from "./AdminComponent";

const RouteCheckComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("userId") !== null);
  const [admin, setAdmin] = useState(sessionStorage.getItem("Admin") === "Yes");
  if (loggedIn) return children;
  if (admin) return <AdminComponent />;
  return <LoginComponent />;
};

export default RouteCheckComponent;

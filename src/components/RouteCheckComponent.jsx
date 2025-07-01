import React, { useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";

const RouteCheckComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("userId") !== null);
  if (!loggedIn) return <LoginComponent />;
  else return children;
};

export default RouteCheckComponent;

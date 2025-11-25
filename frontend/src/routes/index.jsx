import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import AppRoutes from "./app";
import { useSelector } from "react-redux";

const Routers = () => {
  const [isAuthorised, setIsAuthorised] = useState(false);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.token) {
      setIsAuthorised(true);
    } else {
      setIsAuthorised(false);
    }
  }, [auth]);

  return <Router>{isAuthorised ? <AppRoutes /> : <AuthRoutes />}</Router>;
};

export default Routers;

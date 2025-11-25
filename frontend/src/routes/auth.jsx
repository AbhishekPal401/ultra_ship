import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;

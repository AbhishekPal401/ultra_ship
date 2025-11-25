import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/appLayout.jsx";
import Dashboard from "../pages/app/dashboard";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";


const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes inside layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more nested routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;

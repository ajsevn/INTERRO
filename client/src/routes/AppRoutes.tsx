import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import UserDashboard from "../pages/user/UserDashboard";
import Settings from "../pages/user/Settings";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "@/pages/auth/Register";
import AddQuestion from "@/pages/admin/AddQuestion";
import ManageQuestions from "@/pages/admin/ManageQuestions";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Profile from "@/pages/user/Profile";


const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      {/* Protected routes inside layout */}
      <Route element={<MainLayout />}>
      {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-question" element={<AddQuestion/>}/>
        <Route path="/manage-questions" element={<ManageQuestions/>}/>
        {/* User Routes */}
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

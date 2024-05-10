import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { ToastContainer } from "react-toastify";
import "react-responsive-modal/styles.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Sidebar from "./components/SideBar";
import NotLoggedIn from "./components/NotLoggedIn";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const { user } = useAuthContext();

  const hideSidebarOnPages = ["/", "/login", "/register", "/no-access"];
  const shouldRenderSidebar = !hideSidebarOnPages.includes(location.pathname);

  return (
    <div>
      <ToastContainer />
      {shouldRenderSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/no-access" />}
        />
        <Route
          path="/settings"
          element={user ? <SettingsPage /> : <Navigate to="/no-access" />}
        />
        <Route path="/no-access" element={<NotLoggedIn />} />
      </Routes>
    </div>
  );
}

export default App;

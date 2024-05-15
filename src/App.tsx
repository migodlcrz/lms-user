import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NotFound from "./components/NotFound";

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
  const shouldRenderSidebar =
    !hideSidebarOnPages.includes(location.pathname) ||
    "*".includes(location.pathname);

  return (
    <div>
      <ToastContainer />
      {/* {shouldRenderSidebar && <Sidebar />} */}
      <Routes>
        <Route
          path="/"
          element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <div className="flex flex-row bg-[#1c1c1c]">
                <Sidebar />
                <DashboardPage />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            user ? (
              <div className="flex flex-row bg-[#1c1c1c]">
                <Sidebar />
                <SettingsPage />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route path="/no-access" element={<NotLoggedIn />} />
        {/* Add a wildcard route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

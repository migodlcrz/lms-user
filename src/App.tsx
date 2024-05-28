import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-modal/styles.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/NotFound";
import NotLoggedIn from "./components/NotLoggedIn";
import Sidebar from "./components/SideBar";
import { useAuthContext } from "./hooks/useAuthContext";
import CoursePage from "./pages/CoursePage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import StorePage from "./pages/StorePage";
import CourseDetail from "./components/CourseDetail";
import UserCourse from "./components/UserCourse";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const { user } = useAuthContext();

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
          path="/store"
          element={
            <div className="flex flex-row">
              {user && <Sidebar />}
              <StorePage />
            </div>
          }
        />
        <Route
          path="/store/course/:courseId"
          element={
            <div className="flex flex-row">
              {user && <Sidebar />}
              <CourseDetail />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <div className="flex flex-row">
                <Sidebar />
                <DashboardPage />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path="/courses"
          element={
            user ? (
              <div className="flex flex-row">
                <Sidebar />
                <CoursePage />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            user ? (
              <div className="flex flex-row">
                <UserCourse />
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
              <div className="flex flex-row">
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

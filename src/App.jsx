import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import TeamsPage from "./pages/TeamsPage";
import SettingPage from "./pages/SettingPage";
import ReportPage from "./pages/ReportPage";
import ProjectPage from "./pages/ProjectPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import EditTeamPage from "./pages/EditTeamPage";
import EditProjectPage from "./pages/EditProjectPage";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />}>
            Login
          </Route>
          <Route path="/signUp" element={<SignupPage />}>
            Sign Up
          </Route>

          {/* Protected Routes  */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<DashboardPage />} />}
          >
            Dashboard
          </Route>
          <Route
            path="/team"
            element={<ProtectedRoute element={<TeamsPage />} />}
          >
            Teams Page
          </Route>
          <Route
            path="/team/:teamId"
            element={<ProtectedRoute element={<TeamDetailsPage />} />}
          >
            Team Details Page
          </Route>
          <Route
            path="/setting"
            element={<ProtectedRoute element={<SettingPage />} />}
          >
            Setting Page
          </Route>
          <Route
            path="/report"
            element={<ProtectedRoute element={<ReportPage />} />}
          >
            Report Page
          </Route>
          <Route
            path="/project"
            element={<ProtectedRoute element={<ProjectPage />} />}
          >
            Project Page
          </Route>
          <Route
            path="/edit/project/:projectId"
            element={<ProtectedRoute element={<EditProjectPage />} />}
          />
          <Route
            path="/edit/team/:teamId"
            element={<ProtectedRoute element={<EditTeamPage />} />}
          />
          <Route
            path="/edit/task/:taskId"
            element={<ProtectedRoute element={<EditTaskPage />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

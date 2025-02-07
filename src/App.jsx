import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import TeamsPage from "./pages/TeamsPage";
import SettingPage from "./pages/SettingPage";
import ReportPage from "./pages/ReportPage";
import ProjectPage from "./pages/ProjectPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import EditTeamPage from "./pages/EditTeamPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />}>
            Login
          </Route>
          <Route path="/dashboard" element={<DashboardPage />}>
            Dashboard
          </Route>
          <Route path="/signUp" element={<SignupPage />}>
            Sign Up
          </Route>
          <Route path="/team" element={<TeamsPage />}>
            Teams Page
          </Route>
          <Route path="/setting" element={<SettingPage />}>
            Setting Page
          </Route>
          <Route path="/report" element={<ReportPage />}>
            Report Page
          </Route>
          <Route path="/project" element={<ProjectPage />}>
            Project Page
          </Route>
          <Route path="/team/:teamId" element={<TeamDetailsPage />}>
            Team Details Page
          </Route>
          <Route path="/edit-team/:teamId" element={<EditTeamPage />}>
            Team Details Page
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import TeamsPage from "./pages/TeamsPage";

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
            TeamsPage
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

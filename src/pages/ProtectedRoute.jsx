import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("Login token");

  return token ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;

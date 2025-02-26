import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem("Login token");

  return token ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;

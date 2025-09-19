import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext, { authDataContext } from "@/context/AuthContext";
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(authDataContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  // If role is specified (like "admin"), check it
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
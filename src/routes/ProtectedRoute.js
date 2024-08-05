import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    console.log("Not Authenticated, redirecting to login page");
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  console.log("Authenticated");
  // If authenticated, render the child routes
  return <Outlet />;
};

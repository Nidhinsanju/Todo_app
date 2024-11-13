import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Render the protected route
  return <Outlet />;
};
//Need to Study RouteAuth and implement it in this

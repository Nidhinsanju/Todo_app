import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TokenContext } from "../Token";
import { useContext } from "react";
import Menu from "../Components/Utils/Menu";

const MenuComponent = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(TokenContext);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <MenuComponent />;
};

export default ProtectedRoute;

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtecteRoute";
import Home from "../Components/pages/Home";
import Login from "../Components/pages/Login";
import AccountSettings from "../Components/pages/AccountSettings";
import Menu from "../Components/Utils/Menu";

const router = createBrowserRouter([
  { path: "/", element: <Login />, index: true },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/settings",
        element: <AccountSettings />,
      },
    ],
  },
  {
    path: "/testing",
    element: <p>Testing page Nothing here...</p>,
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root";
import Dashboard from "./pages/Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Students from "./pages/Students";

export default function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path: "/root",
      element: <Root />,
      children: [
        {
          path: "/root",
          element: <Dashboard />,
        },
        {
          path: "/root/student",
          element: <Students />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

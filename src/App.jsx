import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root";
import Dashboard from "./pages/Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Students from "./pages/Students";
import AddCategorey from "./pages/AddCategorey";
import AddTools from "./pages/AddTools";
import AddCourse from "./pages/AddCourse";
import Teachers from "./pages/Teachers";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
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
          path: "/root/students",
          element: <Students />,
        },
        {
          path: "/root/teachers",
          element: <Teachers />,
        },
        {
          path: "/root/categorey",
          element: <AddCategorey />,
        },
        {
          path: "/root/tools",
          element: <AddTools />,
        },
        {
          path: "/root/course",
          element: <AddCourse />,
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

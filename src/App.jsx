import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root";
import Dashboard from "./pages/Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AddCategorey from "./pages/AddCategorey";
import AddTools from "./pages/AddTools";
import AddCourse from "./pages/AddCourse";
import Teachers from "./pages/Teachers";
import GetCourses from "./pages/GetCourses";
import AddService from "./pages/AddService";
import Order from "./pages/Order";
import DiscountRequest from "./pages/DiscountRequest";
import CreateBatch from "./pages/CreateBatch";
import AssignStudents from "./pages/AssignStudents";

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
          path: "/root/add_course",
          element: <AddCourse />,
        },
        {
          path: "/root/all_course",
          element: <GetCourses />,
        },
        {
          path: "/root/add_service",
          element: <AddService />,
        },
        {
          path: "/root/enrollment_request",
          element: <Order />,
        },
        {
          path: "/root/discount_request",
          element: <DiscountRequest />,
        },
        {
          path: "/root/create_batch",
          element: <CreateBatch />,
        },
        {
          path: "/root/assign_student",
          element: <AssignStudents />,
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

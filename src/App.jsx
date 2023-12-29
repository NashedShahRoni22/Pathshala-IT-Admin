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
import AddAddmission from "./pages/AddAddmission";
import AddSeminar from "./pages/AddSeminar";
import SeminarRegisteredUser from "./pages/SeminarRegisteredUser";
import AddCourseMaterial from "./pages/AddCourseMaterial";
import Students from "./pages/Students";
import WishBirthday from "./pages/WishBirthday";
import BatchOverview from "./pages/BatchOverview";
import BatchDetails from "./pages/BatchDetails";
import AddSuccessStories from "./pages/AddSuccessStories";
import SendSMS from "./pages/SendSMS";
import AddFreeCourse from "./pages/AddFreeCourse";

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
          path: "/root/students",
          element: <Students />,
        },
        {
          path: "/root/wish_birthday",
          element: <WishBirthday />,
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
          path: "/root/add_free_course",
          element: <AddFreeCourse />,
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
          path: "/root/add_success_stories",
          element: <AddSuccessStories />,
        },
        {
          path: "/root/send_sms",
          element: <SendSMS />,
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
        {
          path: "/root/add_addmission",
          element: <AddAddmission />,
        },
        {
          path: "/root/add_seminar",
          element: <AddSeminar />,
        },
        {
          path: "/root/seminar_registered_user/:id",
          element: <SeminarRegisteredUser />,
        },
        {
          path: "/root/add_course_material",
          element: <AddCourseMaterial />,
        },
        {
          path: "/root/batch_overview",
          element: <BatchOverview />,
        },
        {
          path: "/root/batch_details/:id",
          element: <BatchDetails />,
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

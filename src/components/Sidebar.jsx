import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from "../assets/Pathshala IT Logo.png";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { FiPackage, FiUserPlus, FiUsers } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { TbFreeRights } from "react-icons/tb";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import {
  BsChevronDown,
  BsFillCollectionPlayFill,
  BsPlusCircle,
} from "react-icons/bs";
import { AiOutlineOrderedList, AiOutlinePlus } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GiConvergenceTarget } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { PiChalkboardTeacherDuotone, PiStudent } from "react-icons/pi";
import { FaBell } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

export default function Sidebar() {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openModal && !event.target.closest(".modal-content")) {
        setOpenModal(false);
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);
  const [loader, setLoader] = useState(false);
  const [notifications, setnotifications] = useState([]);

  const handleModal = () => {
    handleMarKAllAsRead();
    setOpenModal(!openModal);
  };

  //get notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.pathshalait.com/api/v1/notifications/read/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();

        if (responseData.status === true) {
          setnotifications(responseData?.data);
        } else {
          console.log(
            "Error making GET request. Status code: " + response.status
          );
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      } finally {
      }
    };

    fetchData();
  }, [loader]);

  //MARK ALL AS READ
  const handleMarKAllAsRead = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://api.pathshalait.com/api/v1/notifications/markAs/read/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log("Error making GET request: " + error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="shadow-xl min-h-screen rounded-b-xl pb-10">
      <div className="flex justify-between items-center p-5 relative">
        <img src={logo} className="h-[40px]" alt="" />

        {role === "super_admin" && (
          <div
            onClick={handleModal}
            className="p-2 bg-blue-500 rounded-full relative cursor-pointer"
          >
            <FaBell className="text-xl text-white" />
            {notifications[0]?.read_status === null && (
              <div className="h-2.5 w-2.5 bg-blue-500 rounded-full shadow-xl absolute -top-2 right-0"></div>
            )}
          </div>
        )}

        {openModal && (
          <div className="modal-content absolute z-50 p-5 min-w-[400px] h-[60vh] overflow-y-scroll bg-white top-16 left-48 rounded-xl shadow-xl">
            {notifications?.map((n, i) => (
              <div
                key={i}
                className="p-2.5 flex justify-between items-center shadow rounded-xl mt-2 relative"
              >
                <p>
                  <span className="font-semibold text-blue-500">
                    {n?.details?.request_type === "order"
                      ? "Enrollment request"
                      : "Discount request"}
                  </span>{" "}
                  for {n?.details?.course_name} by{" "}
                  {n?.details?.request_type === "order" ? (
                    <>{n?.details?.name}</>
                  ) : (
                    <>{n?.details?.user_name}</>
                  )}
                </p>
                {n?.details?.request_type === "order" ? (
                  <Link
                    className="px-2 py-1 bg-blue-500 text-white rounded-full"
                    to="/root/enrollment_request"
                  >
                    View
                  </Link>
                ) : (
                  <Link
                    className="px-2 py-1 bg-blue-500 text-white rounded-full"
                    to="/root/discount_request"
                  >
                    View
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <List>
        <Link to="/root">
          <ListItem>
            <ListItemPrefix>
              <HiOutlinePresentationChartLine className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        {role === "super_admin" ? (
          <>
            <Link to="/root/discount_request">
              <ListItem>
                <ListItemPrefix>
                  <FiPackage className="h-5 w-5" />
                </ListItemPrefix>
                Discount Request
              </ListItem>
            </Link>
            <Link to="/root/enrollment_request">
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineOrderedList className="h-5 w-5" />
                </ListItemPrefix>
                Enrollment Request
              </ListItem>
            </Link>
            <Accordion
              open={open === 1}
              icon={
                <BsChevronDown
                  strokeWidth={1}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FiUsers className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    User Panel
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 ml-5">
                  <Link to="/root/teachers">
                    <ListItem>
                      <ListItemPrefix>
                        <PiChalkboardTeacherDuotone className="h-5 w-5" />
                      </ListItemPrefix>
                      Teachers
                    </ListItem>
                  </Link>
                  <Link to="/root/students">
                    <ListItem>
                      <ListItemPrefix>
                        <PiStudent className="h-5 w-5" />
                      </ListItemPrefix>
                      Students
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <BsChevronDown
                  strokeWidth={1}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <BsFillCollectionPlayFill className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Manage Course
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 ml-5">
                  <Link to="/root/categorey">
                    <ListItem>
                      <ListItemPrefix>
                        <AiOutlinePlus className="h-5 w-5" />
                      </ListItemPrefix>
                      Add Categorey
                    </ListItem>
                  </Link>
                  <Link to="/root/tools">
                    <ListItem>
                      <ListItemPrefix>
                        <AiOutlinePlus className="h-5 w-5" />
                      </ListItemPrefix>
                      Add Tools
                    </ListItem>
                  </Link>
                  <Link to="/root/add_course">
                    <ListItem>
                      <ListItemPrefix>
                        <AiOutlinePlus className="h-5 w-5" />
                      </ListItemPrefix>
                      Add Course
                    </ListItem>
                  </Link>
                  <Link to="/root/all_course">
                    <ListItem>
                      <ListItemPrefix>
                        <GiConvergenceTarget className="h-5 w-5" />
                      </ListItemPrefix>
                      Get Courses
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 4}
              icon={
                <BsChevronDown
                  strokeWidth={1}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 4 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 4}>
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FiUserPlus className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Batch
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 ml-5">
                  <Link to="/root/create_batch">
                    <ListItem>
                      <ListItemPrefix>
                        <BsPlusCircle className="h-5 w-5" />
                      </ListItemPrefix>
                      Create Batch
                    </ListItem>
                  </Link>
                  <Link to="/root/assign_student">
                    <ListItem>
                      <ListItemPrefix>
                        <FiUserPlus className="h-5 w-5" />
                      </ListItemPrefix>
                      Assign Students
                    </ListItem>
                  </Link>
                  <Link to="/root/add_course_material">
                    <ListItem>
                      <ListItemPrefix>
                        <FaCloudUploadAlt className="h-5 w-5" />
                      </ListItemPrefix>
                      Upload Course Material
                    </ListItem>
                  </Link>
                  <Link to="/root/batch_overview">
                    <ListItem>
                      <ListItemPrefix>
                        <SiGoogleclassroom className="h-5 w-5" />
                      </ListItemPrefix>
                      Batch Overview
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 5}
              icon={
                <BsChevronDown
                  strokeWidth={1}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 5}>
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <TbFreeRights className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Free
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 ml-5">
                  <Link to="/root/add_free_course">
                    <ListItem>
                      <ListItemPrefix>
                        <BsPlusCircle className="h-5 w-5" />
                      </ListItemPrefix>
                      Course Material
                    </ListItem>
                  </Link>
                  <Link to="/root/free_class_request">
                    <ListItem>
                      <ListItemPrefix>
                        <VscGitPullRequestGoToChanges className="h-5 w-5" />
                      </ListItemPrefix>
                      Class Request
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Link to="/root/add_addmission">
              <ListItem>
                <ListItemPrefix>
                  <BsPlusCircle className="h-5 w-5" />
                </ListItemPrefix>
                Addmission
              </ListItem>
            </Link>

            <Link to="/root/add_success_stories">
              <ListItem>
                <ListItemPrefix>
                  <BsPlusCircle className="h-5 w-5" />
                </ListItemPrefix>
                Success Stories
              </ListItem>
            </Link>
            <Link to="/root/add_seminar">
              <ListItem>
                <ListItemPrefix>
                  <BsPlusCircle className="h-5 w-5" />
                </ListItemPrefix>
                Seminar
              </ListItem>
            </Link>
            <Link to="/root/add_blogs">
              <ListItem>
                <ListItemPrefix>
                  <FaBlog className="h-5 w-5" />
                </ListItemPrefix>
                Blogs
              </ListItem>
            </Link>
            <Link to="/root/send_sms">
              <ListItem>
                <ListItemPrefix>
                  <IoMdSend className="h-5 w-5" />
                </ListItemPrefix>
                Send SMS
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link to="/root/add_course_material">
              <ListItem>
                <ListItemPrefix>
                  <FaCloudUploadAlt className="h-5 w-5" />
                </ListItemPrefix>
                Upload Course Material
              </ListItem>
            </Link>
            <Link to="/root/batch_overview">
              <ListItem>
                <ListItemPrefix>
                  <SiGoogleclassroom className="h-5 w-5" />
                </ListItemPrefix>
                Batch Overview
              </ListItem>
            </Link>
          </>
        )}
        <Link
          onClick={() => localStorage.clear()}
          to="/"
          className="flex bg-red-500 text-white rounded-xl"
        >
          <ListItem>
            <ListItemPrefix>
              <IoMdLogOut className="h-5 w-5" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </Link>
      </List>
    </section>
  );
}

import React from "react";
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
import { FiUsers } from "react-icons/fi";
import { BsChevronDown, BsFillCollectionPlayFill } from "react-icons/bs";
import { AiFillCustomerService, AiOutlineOrderedList, AiOutlinePlus } from "react-icons/ai";
import { GiConvergenceTarget } from "react-icons/gi";
import { PiStudent, PiChalkboardTeacherDuotone } from "react-icons/pi";

export default function Sidebar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between p-4">
        <img src={logo} alt="" />
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
              <Link to="/root/students">
                <ListItem>
                  <ListItemPrefix>
                    <PiStudent className="h-5 w-5" />
                  </ListItemPrefix>
                  Students
                </ListItem>
              </Link>
              <Link to="/root/teachers">
                <ListItem>
                  <ListItemPrefix>
                    <PiChalkboardTeacherDuotone className="h-5 w-5" />
                  </ListItemPrefix>
                  Teachers
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
          open={open === 3}
          icon={
            <BsChevronDown
              strokeWidth={1}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <AiFillCustomerService className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Manage Service
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
              <Link to="/root/add_service">
                <ListItem>
                  <ListItemPrefix>
                    <AiOutlinePlus className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Service
                </ListItem>
              </Link>
              <Link to="/root/all_course">
                <ListItem>
                  <ListItemPrefix>
                    <GiConvergenceTarget className="h-5 w-5" />
                  </ListItemPrefix>
                  Get Services
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </div>
  );
}

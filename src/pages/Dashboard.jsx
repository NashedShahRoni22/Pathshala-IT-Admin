import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoMdSend } from "react-icons/io";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const data = [
    {
      name: "Students",
      count: "2500",
    },
    {
      name: "Teachers",
      count: "2500",
    },
    {
      name: "Courses",
      count: "2500",
    },
    {
      name: "Batchs",
      count: "2500",
    },
  ];
  return (
    <section className="p-10">
      <p className="text-xl font-semibold">Site overview</p>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
        {data.map((d, i) => (
          <div
            key={i}
            className="shadow shadow-blue-500 rounded-xl p-5 flex flex-col items-center gap-2.5"
          >
            <p className="text-3xl font-semibold">{d.count}</p>
            <p className="text-xl">{d.name}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col md:flex-row md:justify-between gap-5">
        <div className="md:w-2/3 shadow shadow-orange-500 rounded-xl p-5">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            // weekends={false}
            // events={events}
            // eventContent={renderEventContent}
          />
        </div>
        {role === "super_admin" && (
          <div className="p-5 shadow shadow-orange-500 rounded-xl h-fit md:w-1/3">
            <div className="">
              <p className="text-xl font-semibold">Easy Access</p>
              <List>
                <Link to="/root/add_addmission">
                  <ListItem>
                    <ListItemPrefix>
                      <BsPlusCircle className="h-5 w-5" />
                    </ListItemPrefix>
                    Add Addmission
                  </ListItem>
                </Link>
                <Link to="/root/add_free_course">
                  <ListItem>
                    <ListItemPrefix>
                      <BsPlusCircle className="h-5 w-5" />
                    </ListItemPrefix>
                    Add Free Course
                  </ListItem>
                </Link>
                <Link to="/root/add_success_stories">
                  <ListItem>
                    <ListItemPrefix>
                      <BsPlusCircle className="h-5 w-5" />
                    </ListItemPrefix>
                    Add Success Stories
                  </ListItem>
                </Link>
                <Link to="/root/add_seminar">
                  <ListItem>
                    <ListItemPrefix>
                      <BsPlusCircle className="h-5 w-5" />
                    </ListItemPrefix>
                    Add Seminar
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
              </List>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

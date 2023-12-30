import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineDelete } from "react-icons/ai";

export default function AddAddmission() {
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setPostLoading] = useState();
  const [courses, setCourses] = useState([]);
  const [course, setCourseId] = useState("");
  const [open, setOpen] = useState(false);
  const [weekDays, setWeekDays] = useState([]);
  const [admissionData, setAdmissionData] = useState(null);

  const handaleAddDay = (value) => {
    if (value && !weekDays.includes(value)) {
      let getdays = [...weekDays, value];
      setWeekDays(getdays);
    }
  };
  const removeSoftware = (value) => {
    const software = weekDays.filter((software) => software !== value);
    setWeekDays(software);
  };
  const handleOpen = () => setOpen(!open);

  // get course
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/courses",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setCourses(responseData?.data);
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
  }, []);

  const weekdays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  //add addmission
  const handaleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;
    const classStartDate = form.classStartDate.value;
    const startTime = form.startTime.value;
    const endTime = form.endTime.value;

    // console.log(startDate, endDate, classStartDate, startTime, endTime, weekDays, course);

    const formData = new FormData();
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("class_start_time", startTime);
    formData.append("class_end_time", endTime);
    formData.append("class_start_date", classStartDate);
    formData.append("weekly_days", weekDays);
    formData.append("course_id", course);
    formData.append("status", "active");

    try {
      setPostLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/admissions",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === true) {
        window.alert("Admission added successfully!");
        window.location.reload();
      } else {
        console.log(
          "Error making POST request. Status code: " + response.status
        );
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setPostLoading(false);
    }
  };

  //get addmission
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/admissions",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setAdmissionData(responseData?.data);
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
  }, []);

  return (
    <section className="px-10 py-10">
      <form onSubmit={handaleSubmit} className="lg:w-1/3 shadow rounded-xl p-5">
        <h1 className="text-xl font-semibold">Add addmission</h1>
        <div className="mt-5 flex flex-col gap-2.5">
          <Select
            label="Select course"
            onChange={(value) => setCourseId(value)}
          >
            {courses?.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="flex gap-2">
            <Select
              label="Select class days"
              onChange={(value) => handaleAddDay(value)}
            >
              {weekdays?.map((w) => (
                <Option key={w} value={w}>
                  {w}
                </Option>
              ))}
            </Select>

            <Button
              onClick={handleOpen}
              className={`bg-blue-400 ${weekDays.length > 0 && "bg-green-500"}`}
              size="sm"
            >
              View
            </Button>
          </div>
          <Input
            label="Admission start date"
            name="startDate"
            type="datetime-local"
            required
          />
          <Input
            label="Admission end date"
            name="endDate"
            type="datetime-local"
            required
          />
          <Input
            label="Select class start date"
            name="classStartDate"
            type="date"
            required
          />

          <Input
            required
            label="Select class start time"
            name="startTime"
            type="time"
          />
          <Input
            required
            label="Select class end time"
            name="endTime"
            type="time"
          />

          <Button
            className="bg-blue-400"
            type="submit"
            disabled={course === "" || weekDays.length === 0}
          >
            {loading ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
      <div>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader> Days You Select</DialogHeader>
          <DialogBody>
            {weekDays.length === 0 ? (
              <p>Enter some Days</p>
            ) : (
              <div>
                {weekDays?.map((day, i) => (
                  <div key={i} className="flex gap-3 shadow p-2.5">
                    <p className="text-xl text-black">{i + 1}.</p>
                    <div className="flex-1 flex items-center gap-2">
                      <p className="text-xl">{day}</p>
                    </div>
                    <AiOutlineDelete
                      onClick={() => removeSoftware(day)}
                      className="text-red-500 text-3xl cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>

      <div className="mt-10">
        <h1 className="font-semibold text-xl">Admission notice list:</h1>
        <div className="mt-5 grid lg:grid-cols-2 gap-5">
          {admissionData?.map((a, i) => (
            <div key={i} className="shadow rounded p-5">
              <div className="flex justify-between">
                <p className="font-semibold">Notice Number: 0{i + 1}</p>
                <Button size="sm" className="bg-blue-500">
                  Update
                </Button>
              </div>
              <div className="h-0.5 bg-blue-500 my-2.5"></div>
              <p>
                {" "}
                <span className="font-semibold">Course Name:</span>{" "}
                {a?.course?.name}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Class Start Time:</span>{" "}
                {a?.class_start_time}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Class End Time:</span>{" "}
                {a?.class_end_time}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Class End Time:</span>{" "}
                {a?.class_end_time}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Class Start Date:</span>{" "}
                {a?.start_date}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Class End Date:</span>{" "}
                {a?.end_date}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Class Days:</span>{" "}
                {a?.weekly_days}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

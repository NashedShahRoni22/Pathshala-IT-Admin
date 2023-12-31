import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import CourseDetails from "../components/CourseDetails";
import Loader from "../components/Loader";

export default function GetCourses() {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [dataLoading, setDataLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [open, setOpen] = React.useState(false);

  const handleOpen = (data) => {
    setOpen(!open);
    setCourseDetails(data);
  };

  // get course
  useEffect(() => {
    setDataLoading(true);
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
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  // course delete
  const handleDelete = async (id) => {
    try {
      const apiUrl = `https://api.pathshalait.com/api/v1/courses/${id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.status === 200) {
        const updatedCourses = courses?.filter((c) => c.id !== id);
        setCourses(updatedCourses);
        window.alert("Course deleted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  return (
    <section className="px-5 py-10 min-h-screen">
      <h1 className="text-xl font-semibold">Total Courses {courses?.length}</h1>
      {dataLoading ? (
        <Loader/>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses?.map((c, i) => (
            <div
              key={i}
              className="shadow rounded-xl flex flex-col justify-between"
            >
              <img
                src={c?.course_image}
                className="w-[380px] h-[240px] rounded-t-xl"
                alt=""
              />
              <div className="p-2">
                <h5 className="text-xl font-semibold">{c?.name}</h5>
                <p className="my-2.5">{c?.course_overview?.slice(0, 100)}</p>
              </div>
              <div className="flex justify-between p-2">
                <Button onClick={() => handleOpen(c)} color="blue">
                  View
                </Button>
                <Button onClick={() => handleDelete(c?.id)} color="red">
                  Delete
                </Button>
              </div>
            </div>
          ))}{" "}
        </div>
      )}

      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>
          <Typography className="text-xl font-semibold">Details of {courseDetails?.name}</Typography>
        </DialogHeader>
        <DialogBody>
          <CourseDetails courseDetails={courseDetails} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}

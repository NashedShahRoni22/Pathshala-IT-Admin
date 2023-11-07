import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export default function GetCourses() {
  const [courses, setCourses] = useState([]);
  console.log(courses);
  const [dataLoading, setDataLoading] = useState(false);
  // get tools
  useEffect(() => {
    setDataLoading(true);
    // Only call the API when accessToken is available and loading is true
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/courses",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
        setDataLoading(false); // Set loading state to false when the request is complete
      }
    };

    fetchData();
  }, []);
  return (
    <section className="px-5 py-10 min-h-screen">
      <h1 className="text-xl font-semibold">Total Courses {courses?.length}</h1>
      {dataLoading ? (
        "Loading"
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses?.map((c, i) => (
            <div key={i} className="shadow rounded flex flex-col justify-between">
              <img src={c?.course_image} className="w-[380px] h-[240px]" alt="" />
              <div className="p-2">
                <h5 className="text-xl font-semibold">{c?.name}</h5>
                <p className="my-2.5">{c?.course_overview?.slice(0, 100)}</p>
                
              </div>
              <div className="flex justify-between p-2">
                  <Button color="blue">View</Button>
                  <Button color="red">Delete</Button>
                </div>
            </div>
          ))}{" "}
        </div>
      )}
    </section>
  );
}

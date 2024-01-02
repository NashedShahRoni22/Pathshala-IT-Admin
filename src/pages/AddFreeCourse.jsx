import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function AddFreeCourse() {
  const accessToken = localStorage.getItem("accessToken");
  const [courses, setCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
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

  //add free courses
  const handaleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const url = form.url.value;
    const title = form.title.value;

    const formData = new FormData();
    formData.append("url", url);
    formData.append("course_id", course);
    formData.append("title", title);

    try {
      setLoading(true);
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/free_course_materials/videos",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === true) {
        window.alert("Free Courses added successfully!");
      } else {
        console.log(
          "Error making POST request. Status code: " + response.status
        );
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setLoading(false);
    }
  };

  // get free courses
  useEffect(() => {
    const fetchData = async () => {
      setGetLoading(true);
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/free_course_materials/videos",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setFreeCourses(responseData?.data);
        } else {
          console.log(
            "Error making GET request. Status code: " + response.status
          );
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [loading]);
  
  const TABLE_HEAD = ["Title", "URL", ""];
  return (
    <section className="px-10 py-10 flex flex-col gap-10 lg:flex-row">
      <form onSubmit={handaleSubmit} className="shadow p-5 rounded-xl lg:w-1/2">
        <h1 className="text-xl font-semibold mb-5">Add Free Class Video</h1>
        <div className="flex flex-col gap-2.5">
          <Select label="Select Categorey" onChange={(value) => setCourse(value)}>
            {courses.map((b) => (
              <Option value={b.id}>{b?.name}</Option>
            ))}
          </Select>
          <Input name="title" label="Enter Title" />
          <Input name="url" label="Enter URL" />
          <Button
            type="submit"
            className="bg-blue-500 flex justify-center gap-2 items-center"
          >
            Submit
            {loading && <Spinner className="h-4 w-4" />}
          </Button>
        </div>
      </form>
      {getLoading ? (
        <Loader />
      ) : (
        <Card className="h-full w-full lg:w-1/2">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {freeCourses.map((fc, index) => {
                const isLast = index === freeCourses.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {fc?.title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {fc?.url}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button size="sm" className="bg-red-500">
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </section>
  );
}

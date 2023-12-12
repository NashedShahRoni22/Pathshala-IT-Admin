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

export default function CreateBatch() {
  const accessToken = localStorage.getItem("accessToken");
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);

  const [postLoading, setPostLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);

  const [teacherId, setTeacherId] = useState("");
  const [courseId, setCourseId] = useState("");

  //add batch
  const handleCreateBatch = async (e) => {
    e.preventDefault();
    const batch_name = e.target.batch_name.value;
    const student_capacity = e.target.student_capacity.value;

    console.log(batch_name, student_capacity, teacherId, courseId);

    const formData = new FormData();
    formData.append("batch_name", batch_name);
    formData.append("student_capacity", student_capacity);
    formData.append("teacher_id", teacherId);
    formData.append("course_id", courseId);
    try {
      setPostLoading(true);
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/batch-management/batches",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        window.alert("Batch created successfully!");
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

  // get teacher
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/all-user/teacher",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setTeachers(responseData?.data);
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
  
  // get batches
  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/batch-management/batches",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setBatches(responseData?.data);
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
  }, [postLoading]);

  const TABLE_HEAD = [
    "Name",
    "Capacity",
    "Course",
    "Teacher",
    "Number",
    "Action",
  ];

  return (
    <section className="px-10 py-20">
      <form
        action=""
        onSubmit={handleCreateBatch}
        className="lg:w-1/2 flex flex-col gap-2.5 mt-5 shadow rounded-xl p-5"
      >
        <h1>Create Batch</h1>
        <Input
          type="text"
          required
          name="batch_name"
          label="Enter Batch Name"
        />
        <Input
          type="number"
          required
          name="student_capacity"
          label="Enter Batch Capacity"
        />
        <Select
          label="Select Teacher"
          onChange={(value) => setTeacherId(value)}
        >
          {teachers?.map((t) => (
            <Option key={t?.id} value={t?.id}>
              {t?.name}
            </Option>
          ))}
        </Select>
        <Select label="Select Course" onChange={(value) => setCourseId(value)}>
          {courses?.map((c) => (
            <Option key={c.id} value={c.id}>
              {c.name}
            </Option>
          ))}
        </Select>
        <Button
          type="submit"
          color="blue"
          className="flex justify-center items-center gap-2"
        >
          Submit {postLoading && <Spinner className="h-4 w-4" />}
        </Button>
      </form>
      {getLoading ? (
        <Loader />
      ) : (
        <Card className="h-full w-full overflow-scroll mt-10">
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
              {batches?.map((b, index) => {
                const isLast = index === batches.length - 1;
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
                        {b?.batch_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {b?.student_capacity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {b?.course_details?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {b?.teacher_details?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {b?.teacher_details?.phone_number}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button color="blue" size="sm">
                        View
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

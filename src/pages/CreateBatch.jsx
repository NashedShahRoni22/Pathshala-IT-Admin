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

  const [postLoading, setPostLoading] = useState(false);

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
          // console.log(responseData); 
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


  return (
    <section className="px-10 py-10">
      <form
        action=""
        onSubmit={handleCreateBatch}
        className="lg:w-1/2 flex flex-col gap-2.5 mt-5 shadow rounded-xl p-5"
      >
        <h1 className="text-xl font-semibold">Create Batch</h1>
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
    </section>
  );
}

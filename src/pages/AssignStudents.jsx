import { Button, Input, Option, Select, Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export default function AssignStudents() {
  const accessToken = localStorage.getItem("accessToken");
  const [batches, setBatches] = useState([]);

  const [studentGetLoader, setStudentLoader] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [err, setErr] = useState("");

  const [student, setStudent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [batch, setBatch] = useState("");
  const [number, setNumber] = useState("");

  // get batches
  useEffect(() => {
    const fetchData = async () => {
      try {
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
          // console.log(responseData);
          setBatches(responseData?.data);
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

  //get student
  const handleGetData = () => {
    setStudentLoader(true);
    console.log(batch, number);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.pathshalait.com/api/v1/batch-management/filter/student/${batch}/${number}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.status === true) {
          setStudent(jsonData?.data);
          setStudentId(jsonData?.data?.student_details?.id);
          setStudentLoader(false);
        } else {
          setStudent("");
          setStudentId("");
          setErr(jsonData?.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  //handle assign student
  const handleAssignStudent = async () => {
    const formData = new FormData();
    const postData = {
      batch,
      studentId,
    };
    console.log(postData);
    formData.append("batch_id", batch);
    formData.append("student_id", studentId);
    try {
      setPostLoader(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/batch-management/assign/student",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === true) {
        window.alert("Student assigned successfully!");
        window.location.reload();
      } else {
        console.log(
          "Error making POST request. Status code: " + response.status
        );
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setPostLoader(false);
    }
  };

  return (
    <section className="px-5 py-10 flex flex-col gap-5 lg:flex-row lg:items-center">
      <div className="lg:w-1/2 shadow p-5 rounded-xl flex flex-col gap-2.5">
        <h5 className="font-semibold">Assign Student</h5>
        <Select label="Select Batch" onChange={(value) => setBatch(value)}>
          {batches?.map((b) => (
            <Option key={b?.id} value={b?.id}>{b?.batch_name}</Option>
          ))}
        </Select>
        <div className="flex items-center gap-1">
          <Input
            required
            color="blue"
            label="Enter Student Phone Number"
            type="number"
            name="number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <Button
            onClick={handleGetData}
            disabled={number.length !== 11}
            color="blue"
          >
            Search
          </Button>
        </div>
        <Button
          color="blue"
          onClick={handleAssignStudent}
          className="flex items-center gap-2 justify-center"
          disabled={student === "" || batch === ""}
        >
          Assign
          {postLoader && <Spinner className="h-4 w-4" />}
        </Button>
      </div>
      {student !== "" ? (
        <div className="lg:w-1/2 p-5">
          <h1 className="font-semibold text-xl">Student Information</h1>{" "}
          <p>
            {" "}
            <span className="font-semibold mt-2.5">Name:</span>{" "}
            {student?.student_details?.name}{" "}
          </p>
          <p>
            {" "}
            <span className="font-semibold">ID:</span>{" "}
            {student?.student_details?.student_id_number}{" "}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Phone:</span>{" "}
            {student?.student_details?.phone_number}{" "}
          </p>
        </div>
      ) : (
        <>
          {err !== "" ? (
            <p className="text-3xl font-semibold text-center w-full">{err}</p>
          ) : (
            <p className="text-3xl font-semibold text-center w-full">
              Find Student
            </p>
          )}
        </>
      )}
    </section>
  );
}

import {
  Button,
  Card,
  Dialog,
  DialogBody,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function Students() {
  const accessToken = localStorage.getItem("accessToken");
  const [students, setStudents] = useState([]);
  // console.log(students);
  const [batches, setBatches] = useState([]);
  const [batch, setBatch] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [loader, setLoader] = useState(false);

  const [open, setOpen] = React.useState(false);

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

  //get enrolled students
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const response = await fetch(
          `https://api.pathshalait.com/api/v1/student/filter?batch_id=${batch}&course_id=${course}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();
        setStudents(responseData?.data);
      } catch (error) {
        console.log("Error making GET request: " + error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [batch, course]);

  const TABLE_HEAD = ["Name", "Phone", "Email", "Gurdian", "Phone"];

  //print pdf
  function printDiv(divId) {
    var printContents = document.getElementById(divId).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  return (
    <section className="mx-5 my-10">
      <div className="mt-10 flex justify-between items-center">
        <div className="flex gap-2">
          <Select label="Select Batch" onChange={(value) => setBatch(value)}>
            {batches.map((b, i) => (
              <Option key={i} value={b.id}>
                {b?.batch_name}
              </Option>
            ))}
          </Select>
          <Select label="Select Course" onChange={(value) => setCourse(value)}>
            {courses.map((b, i) => (
              <Option key={i} value={b.id}>
                {b?.name}
              </Option>
            ))}
          </Select>
        </div>
        <Link
          to="/root/wish_birthday"
          className="flex items-center gap-2 px-4 py-2 rounded shadow text-white bg-blue-400"
        >
          Wish Birthday
        </Link>
      </div>

      {loader ? (
        <Loader />
      ) : (
        <>
          <Card
            id="student-details"
            className="h-full w-full overflow-x-scroll mt-10"
          >
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
                {students?.map((student, index) => {
                  const isLast = index === students.length - 1;
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
                          {student?.student_list?.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {student?.student_list?.phone_number}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {student?.student_list?.email}
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
                          {student?.student_list?.student?.guardian_name}
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
                          {student?.student_list?.student?.guardian_number}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <div className="flex justify-end mt-5 mr-5">
            <button
              onClick={() => printDiv("student-details")}
              className="px-4 py-2 w-fit bg-blue-500 text-white shadow rounded"
            >
              Download
            </button>
          </div>
        </>
      )}
    </section>
  );
}

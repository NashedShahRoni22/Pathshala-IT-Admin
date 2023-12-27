import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Card, Typography } from "@material-tailwind/react";

export default function BatchDetails() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [materials, setMaterials] = useState([]);
  console.log(materials, students);
  const [dataLoading, setDataLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [view, setView] = useState(1);

  //get students
  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.pathshalait.com/api/v1/student/filter?batch_id=${id}&course_id=${null}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();

        if (responseData.status === true) {
          setStudents(responseData?.data);
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

  //get materials
  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.pathshalait.com/api/v1/course_materials/videos/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();
        // console.log(responseData);

        if (responseData.status === true) {
          setMaterials(responseData?.data);
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

  const Student_HEAD = ["Name", "Email", "Phone"];
  const Materials_HEAD = ["Name", "Date", "Title", "URL"];
  return (
    <section className="px-10 py-10">
      {dataLoading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-xl font-semibold">Batch details</h1>
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setView(1)}
              className={`px-4 py-2 rounded-full ${
                view === 1 && "bg-blue-500 text-white"
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setView(2)}
              className={`px-4 py-2 rounded-full ${
                view === 2 && "bg-blue-500 text-white"
              }`}
            >
              Course Materials
            </button>
          </div>
          <div className="mt-5">
            {view === 1 ? (
              <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {Student_HEAD.map((head) => (
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
                    {students?.map((m, index) => {
                      const isLast = index === students?.length - 1;
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
                              {m?.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {m?.email}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {m?.phone_number}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            ) : (
              <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {Materials_HEAD.map((head) => (
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
                    {materials?.map((m, index) => {
                      const isLast = index === materials?.length - 1;
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
                              {m?.batch_details?.batch_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {m?.class_started_date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {m?.title}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {m?.url}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

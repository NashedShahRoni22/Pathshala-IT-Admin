import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function BatchOverview() {
  const accessToken = localStorage.getItem("accessToken");
  const [getLoading, setGetLoading] = useState(false);
  const [batches, setBatches] = useState([]);
  const TABLE_HEAD = [
    "Name",
    "Capacity",
    "Course",
    "Teacher",
    "Number",
    "Action",
  ];

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
  }, []);
  return (
    <section className="px-10 py-10">
      {getLoading ? (
        <Loader />
      ) : (
        <Card className="h-full w-full overflow-scroll">
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
                      <Link className="px-2 py-1 bg-blue-400 text-white shadow rounded" to={`/root/batch_details/${b?.id}`} color="blue" size="sm">
                        View
                      </Link>
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

import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export default function WishBirthday() {
  const accessToken = localStorage.getItem("accessToken");
  const [students, setStudents] = useState([]);
  console.log(students);

  //get enrolled students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/student/birthday",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();
        // console.log(responseData);
        if (response.status === true) {
          setStudents(responseData?.data);
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const TABLE_HEAD = ["Name", "Phone Number", ""];
  return (
    <section className="mx-5 my-10">
      {students.length === 0 ? (
        <p className="text-3xl font-semibold text-center">No student to wish today!</p>
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
              {students.map((student, index) => {
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
                        {student?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {student?.phone_number}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button>Wish</Button>
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

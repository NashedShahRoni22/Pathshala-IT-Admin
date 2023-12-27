import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AddSeminar() {
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setPostLoading] = useState(false);
  const [seminars, setSeminars] = useState([]);

  const TABLE_HEAD = ["Topic", "Date", "Start Time", "End Time", "Action"];

  //add seminar
  const handaleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const start_date = form.start_date.value;
    const seminar_start_time = form.seminar_start_time.value;
    const seminar_end_time = form.seminar_end_time.value;

    // console.log(subject, start_date, seminar_start_time, seminar_end_time);

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("start_date", start_date);
    formData.append("seminar_start_time", seminar_start_time);
    formData.append("seminar_end_time", seminar_end_time);
    formData.append("type", "online");
    formData.append("status", "active");

    try {
      setPostLoading(true);
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/seminars",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === true) {
        window.alert("Seminar added successfully!");
        // window.location.reload();
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

  //get seminar
  useEffect(() => {
    // setDataLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/seminars",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setSeminars(responseData?.data);
        } else {
          console.log(
            "Error making GET request. Status code: " + response.status
          );
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      } finally {
        // setDataLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  return (
    <section className="px-10 py-10">
      <form
        onSubmit={handaleSubmit}
        className="lg:w-1/3 shadow rounded p-5"
      >
        <h1 className="text-xl font-semibold">Add seminar</h1>
        <div className="mt-5 flex flex-col gap-2.5">
          <Input
            color="blue"
            label="Enter subject"
            name="subject"
            type="text"
          />
          <Input
            color="blue"
            label="Select date"
            name="start_date"
            type="date"
          />
          <Input
            color="blue"
            label="Seminar start time"
            name="seminar_start_time"
            type="time"
          />
          <Input
            color="blue"
            label="Seminar end time"
            name="seminar_end_time"
            type="time"
          />

          <Button className="bg-blue-500" type="submit">
            {loading ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>

      <div className="mt-5">
        <h1 className="text-xl font-semibolds">Seminar list:</h1>
        <Card className="h-full w-full overflow-scroll mt-5">
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
              {seminars.map((s, index) => {
                const isLast = index === seminars.length - 1;
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
                        {s?.subject}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {s?.start_date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {s?.seminar_start_time}
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
                        {s?.seminar_end_time}
                      </Typography>
                    </td>
                    <td className={classes}>
                        <Link to={`/root/seminar_registered_user/${s?.id}`} className="px-4 py-2 bg-blue-500 text-white shadow rounded">View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  );
}

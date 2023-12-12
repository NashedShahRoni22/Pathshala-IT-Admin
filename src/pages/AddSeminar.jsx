import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";

export default function AddSeminar() {
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setPostLoading] = useState();

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
    formData.append("type", 'online');
    formData.append("status", 'active');

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
  return (
    <section className="px-10 py-20">
      <form
        onSubmit={handaleSubmit}
        className="md:w-1/2 lg:w-1/3 shadow rounded p-5"
      >
        <h1>Add seminar</h1>
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

          <Button className="bg-blue-400" type="submit">
            {loading ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
    </section>
  );
}

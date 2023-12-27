import { Button, Spinner, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";

export default function SendSMS() {
  const [postLoading, setPostLoading] = useState(false);
  const [file, setFile] = useState("");

  const handaleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;

    const formData = new FormData();
    formData.append("sms_body", message);
    formData.append("file", file);

    try {
      setPostLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/import/contacts",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === true) {
        window.alert("SMS sent successfully!");
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
    <section className="px-5 py-10">
      <form
        onSubmit={handaleSubmit}
        className="flex flex-col gap-2 md:w-1/2 lg:w-1/3 shadow rounded p-5"
      >
        <h1 className="text-xl font-semibold">Send SMS</h1>
        <input type="file" accept=".csv, .xlsx" onChange={ e => setFile(e.target.files[0])} />
        <Textarea name="message" label="Enter Message" />
        <Button type="submit" className="bg-blue-500 flex justify-center items-center gap-2.5">Send {postLoading && <Spinner className="h-4 w-4" /> } </Button>
      </form>
    </section>
  );
}

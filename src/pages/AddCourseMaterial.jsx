import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export default function AddCourseMaterial() {
  const [batches, setBatches] = useState([]);
  const [batch, setBatch] = useState("");
  const [postLoader, setPostLoader] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
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
  //upload material
  const addMaterial = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    const class_started_date = form.class_started_date.value;
    const title = form.title.value;
    const url = form.url.value;
    const postData = {
        class_started_date,
        title,
        url
    };
    console.log(postData);
    formData.append("batch_id", batch);
    formData.append("class_started_date", class_started_date);
    formData.append("title", title);
    formData.append("url", url);
    try {
      setPostLoader(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/course_materials/videos",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.status === true) {
        window.alert("Material added successfully!");
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
    <section className="px-10 py-10 flex flex-col gap-5 lg:flex-row lg:items-center">
      <form onSubmit={addMaterial} className="lg:w-1/2 shadow p-5 rounded-xl flex flex-col gap-2.5">
        <h1 className="text-xl font-semibold">Add Course Material</h1>
        <Input
          required
          color="blue"
          label="Select Class Date"
          type="date"
          name="class_started_date"
        />
        <Select label="Select Batch" onChange={(value) => setBatch(value)}>
          {batches?.map((b) => (
            <Option key={b?.id} value={b?.id}>
              {b?.batch_name}
            </Option>
          ))}
        </Select>
        <Input
          required
          color="blue"
          label="Enter Title"
          type="text"
          name="title"
        />
        <Input
          required
          color="blue"
          label="Enter Video Url"
          type="text"
          name="url"
        />

        <Button
          color="blue"
          type="submit"
          className="flex items-center gap-2 justify-center"
          disabled={batch === ""}
        >
          Upload
          {postLoader && <Spinner className="h-4 w-4" />}
        </Button>
      </form>
    </section>
  );
}

import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function AddSuccessStories() {
  const accessToken = localStorage.getItem("accessToken");
  const [courses, setCourses] = useState([]);
  const [stories, setStories] = useState([]);
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
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

  //add stories
  const handaleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const url = form.url.value;

    const formData = new FormData();
    formData.append("url", url);
    formData.append("course_id", course);
    formData.append("thumbnail_image", image);

    try {
      setLoading(true);
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/success_stories",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === true) {
        window.alert("Stories added successfully!");
      } else {
        console.log(
          "Error making POST request. Status code: " + response.status
        );
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setLoading(false);
    }
  };

  // get stories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/success_stories",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setStories(responseData?.data);
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
  }, [loading, updateLoading]);

  //deactive stories
  const deactiveStory = async (id, type) => {
    const formData = new FormData();
    if (type === "inactive") {
      formData.append("status", "inactive");
    } else {
      formData.append("status", "active");
    }

    formData.append("_method", "put");

    try {
      setUpdateLoading(true);
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        `https://api.pathshalait.com/api/v1/success_stories/${id}`,
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === true) {
        window.alert("Stories status updated successfully!");
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <section className="px-10 py-10">
      <form onSubmit={handaleSubmit} className="shadow p-5 rounded-xl lg:w-1/3">
        <h1 className="text-xl font-semibold mb-5">Add Success Stories</h1>
        <div className="flex flex-col gap-2.5">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <p className="text-red-500 text-sm">
            Image size will be (585px * 340px)
          </p>
          <Select label="Select Course" onChange={(value) => setCourse(value)}>
            {courses.map((b) => (
              <Option value={b.id}>{b?.name}</Option>
            ))}
          </Select>
          <Input name="url" label="Enter URL" />
          <Button
            type="submit"
            className="bg-blue-500 flex justify-center gap-2 items-center"
          >
            Submit
            {loading && <Spinner className="h-4 w-4" />}
          </Button>
        </div>
      </form>
      {getLoading ? (
        <Loader />
      ) : (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stories.map((s, i) => (
            <div key={i} className="p-2 shadow-xl rounded-xl">
              <img src={s?.thumbnail_image} />

              <div className="mt-5 flex justify-between">
                {s?.status === 1 ? (
                  <Button
                    onClick={() => deactiveStory(s?.id, "inactive")}
                    className="bg-orange-500"
                    size="sm"
                  >
                    Deactive
                  </Button>
                ) : (
                  <Button
                    onClick={() => deactiveStory(s?.id, "active")}
                    className="bg-blue-500"
                    size="sm"
                  >
                    Active
                  </Button>
                )}
                <Button className="bg-red-500" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

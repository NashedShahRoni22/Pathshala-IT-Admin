import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export default function AddCategorey() {
  const [postLoading, setPostLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [categories, setCategories] = useState([]);
  // console.log(categories);
  // get categories
  useEffect(() => {
    setDataLoading(true);
    // Only call the API when accessToken is available and loading is true
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/categories",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setCategories(responseData?.data);
        } else {
          console.log(
            "Error making GET request. Status code: " + response.status
          );
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      } finally {
        setDataLoading(false); // Set loading state to false when the request is complete
      }
    };

    fetchData();
  }, []);

  //add categorey
  const handleAddCategorey = async () => {
    const formData = new FormData();
    console.log(icon, name);
    formData.append("icon", icon);
    formData.append("name", name);
    try {
      setPostLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/categories",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
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
    <section className="px-5 py-10 min-h-screen lg:flex">
      <form className="lg:w-1/3 shadow p-5 h-fit flex flex-col gap-4">
        <h5>Add Categorey</h5>
        <input
          name="icon"
          type="file"
          onChange={(e) => setIcon(e.target.files[0])}
        />
        <Input
          name="name"
          color="blue"
          type="text"
          label="Categorey Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Button color="blue" onClick={handleAddCategorey}>
          {postLoading ? "Loading.." : "Add"}
        </Button>
      </form>
      <div className="min-h-screen lg:w-2/3 mt-5 md:mt-0 bg-light-blue-50 rounded-xl p-5">
        <p>Categorey List</p>
        <div>
          {dataLoading ? (
            "Loading Data ..."
          ) : (
            <>
              {categories?.map((c, i) => (
                <div key={i}>
                  <img src={c?.icon} alt="" />
                  <p>{c?.name}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

import { Button, Input, Option, Select, alert } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export default function AddTools() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [type, setType] = useState("");
  const [tools, setTools] = useState([]);
  // console.log(tools);
  const accessToken = localStorage.getItem("accessToken");
  const [postLoading, setPostLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  // get tools
  useEffect(() => {
    setDataLoading(true);
    // Only call the API when accessToken is available and loading is true
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/tools",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setTools(responseData?.data);
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
  }, [postLoading]);
  // add tools
  const handleAddTools = async () => {
    // console.log(icon, type, name);
    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("type", type);
    formData.append("name", name);
    try {
      setPostLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch("https://api.pathshalait.com/api/v1/tools", {
        method: "POST",
        headers,
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        window.alert("Tools added successfully!");
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

  // delete tools
  const handleDelete = async (id) => {
    try {
      const apiUrl = `https://api.pathshalait.com/api/v1/tools/${id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.status === 200) {
        const updatedTools = tools?.filter((c) => c.id !== id);
        setTools(updatedTools);
        window.alert("Tools deleted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  return (
    <section className="px-5 py-10 min-h-screen lg:flex">
      <form
        action=""
        className="h-fit lg:w-1/3 shadow rounded-xl p-5 flex flex-col justify-center gap-4"
      >
        <h5 className="font-semibold text-xl">Add Tools</h5>
        <Select
          label="Select Type"
          color="blue"
          onChange={(value) => setType(value)}
        >
          <Option value="software">Software</Option>
          <Option value="profession">Profession</Option>
        </Select>
        <input type="file" onChange={(e) => setIcon(e.target.files[0])}></input>
        <p className="text-red-500">Image size will be (50px * 50px)</p>
        <Input
          color="blue"
          type="text"
          label="Tools Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Button onClick={handleAddTools} color="blue">
          {postLoading ? "Loading" : "Add"}
        </Button>
      </form>
      <div className="min-h-screen  lg:w-2/3 mt-10 lg:mt-0 bg-light-blue-50 rounded-xl p-5">
        <h5 className="font-semibold text-xl">Tools List</h5>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          {dataLoading ? (
            "Loding Data..."
          ) : (
            <>
              {tools.map((t, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2.5 rounded bg-white"
                >
                  <div className="flex gap-2.5 items-center">
                    <img src={t?.icon} alt="" className="h-[50px] w-[50px]" />
                    <p>{t?.name}</p>
                  </div>
                  <Button onClick={()=> handleDelete(t?.id)} size="sm" className="bg-red-500">Delete</Button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

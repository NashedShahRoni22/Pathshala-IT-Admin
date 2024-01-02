import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";

export default function AddCategorey() {
  const [postLoading, setPostLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [categories, setCategories] = useState([]);
  //handle modal
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };

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
  }, [postLoading, updateLoading]);

  //add categorey
  const handleAddCategorey = async () => {
    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("name", name);
    try {
      setPostLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
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
        // console.log(responseData);
        window.alert("Categorey Added Successfully!");
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

  //update categorey
  const handleUpdateCategorey = async (id) => {
    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("name", name);
    formData.append("_method", "put");
  
    try {
      setUpdateLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        `https://api.pathshalait.com/api/v1/categories/${id}`,
        {
          method: "POST",
          headers,
          body: formData,
        }
      );
      const responseData = await response.json();

      if (responseData.status === true) {
        window.alert("Updated Added Successfully!");
        setOpen(false);
      } else {
        console.log(
          "Error making POST request. Status code: " + response.status
        );
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <section className="px-5 py-10 min-h-screen lg:flex">
      <form className="lg:w-1/3 shadow rounded-xl p-5 h-fit flex flex-col gap-4">
        <h5 className="font-semibold text-xl">Add Categorey</h5>
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
      <div className="min-h-screen lg:w-2/3 mt-10 lg:mt-0 bg-light-blue-50 rounded-xl p-5">
        <h5 className="font-semibold text-xl">Categorey List</h5>
        <div className="mt-5">
          {dataLoading ? (
            "Loading Data ..."
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {categories?.map((c, i) => (
                <div
                  key={i}
                  className="flex p-2.5 bg-white rounded items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={c?.icon}
                      className="h-[50px] w-[50px] rounded-full"
                      alt=""
                    />
                    <p>{c?.name}</p>
                  </div>
                  <Button
                    onClick={() => handleOpen(c)}
                    size="sm"
                    className="bg-blue-500"
                  >
                    Update
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <Dialog open={open} handler={handleOpen}>
          <DialogBody>
            <form className="flex flex-col gap-5">
              <p className="text-black font-semibold">Update {modalData?.name}</p>
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
                defaultValue={modalData?.name}
                onChange={(e) => setName(e.target.value)}
              />
              <div>
                <Button
                  onClick={() => handleUpdateCategorey(modalData?.id)}
                  variant="gradient"
                  color="blue"
                  size="sm"
                >
                  <span>Update</span>
                </Button>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                  size="sm"
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </div>
    </section>
  );
}

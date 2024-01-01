import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export default function Teachers() {
  const [postLoading, setPostLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [designation, setDesignation] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  //add teacher
  const handleAddUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const number = form.number.value;
    const password = form.password.value;
    const postData = {
      name,
      phone_number: number,
      password,
      designation_id: designation,
      user_type: "teacher",
    };
    // console.log(postData);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone_number", number);
    formData.append("password", password);
    formData.append("designation_id", designation);
    formData.append("user_type", "teacher");
    try {
      setPostLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch("https://api.pathshalait.com/api/v1/users", {
        method: "POST",
        headers,
        body: formData,
      });

      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.status === true) {
        window.alert("Teacher Added Successfully!");
        e.target.reset();
      }
      else{
        window.alert("This phone number can't be use.");
        e.target.reset();
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setPostLoading(false);
    }
  };

  //get teacher
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/all-user/teacher",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setTeachers(responseData?.data);
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
  }, [postLoading]);

  //get designation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/designations",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setDesignations(responseData?.data);
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

  const TABLE_HEAD = ["Name", "Designation", "Phone", ""];
  return (
    <section className="px-10 py-10">
      <form
        className="lg:w-1/2 shadow p-5 rounded-xl flex flex-col gap-2.5"
        action=""
        onSubmit={handleAddUser}
      >
        <h5 className="font-semibold">Add Teacher</h5>

        <Select
          label="Select Desigtaion"
          onChange={(value) => setDesignation(value)}
        >
          {designations.map((d) => (
            <Option value={d?.id}>{d?.designation_name}</Option>
          ))}
        </Select>

        <Input
          required
          color="blue"
          label="Enter Name"
          type="text"
          name="name"
        />

        <Input
          required
          color="blue"
          label="Phone Number"
          type="number"
          name="number"
        />

        <Input
          required
          color="blue"
          label="Enter Password"
          type="password"
          name="password"
        />

        <Button
          color="blue"
          type="submit"
          className="flex items-center gap-2 justify-center"
          disabled={designation === ""}
        >
          Submit {postLoading && <Spinner className="h-4 w-4" />}
        </Button>
      </form>

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
            {teachers?.map((b, index) => {
              const isLast = index === teachers.length - 1;
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
                      {b?.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {b?.designation} 
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {b?.phone_number}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button size="sm" className="bg-orange-500" >Deactive</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </section>
  );
}

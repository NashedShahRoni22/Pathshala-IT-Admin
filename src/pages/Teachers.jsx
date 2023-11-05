import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";

export default function Teachers() {
  const [postLoading, setPostLoading] = useState(false);
  const [userType, setUserType] = useState("");
  const handleAddUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const number = form.number.value;
    const password = form.password.value;
    const postData = {
      name,
      phone_number:number,
      password,
      designation_id: 1,
      user_type: userType,
    };
    console.log(postData);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone_number", number);
    formData.append("password", password);
    formData.append("designation_id", 1);
    formData.append("user_type", userType);
    try {
      setPostLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch("https://api.pathshalait.com/api/v1/users", {
        method: "POST",
        headers,
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        window.alert("User Added Successfully!");
        setUserType("");
        e.target.reset();
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
    <form
      className="lg:w-1/2 m-10 shadow p-5 rounded-xl flex flex-col gap-2.5"
      action=""
      onSubmit={handleAddUser}
    >
      <h5 className="font-semibold">Add Teacher</h5>
      <Input required color="blue" label="Enter Name" type="text" name="name" />
      <Input
        required
        color="blue"
        label="Phone Number"
        type="number"
        name="number"
      />
      <Select label="Select User Type" onChange={(value) => setUserType(value)}>
        <Option value="teacher">Teacher</Option>
        <Option value="admin">Admin</Option>
      </Select>
      <Input
        required
        color="blue"
        label="Enter Password"
        type="password"
        name="password"
      />
      <Button color="blue" type="submit">
        {postLoading ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
}

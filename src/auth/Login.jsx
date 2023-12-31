import { Button, Input, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const number = e.target.number.value;
    const password = e.target.password.value;
    try {
      setLoading(true);
      const data = {
        phone_number: number,
        password,
      };
      // Make a POST request using the fetch method
      const response = await fetch("https://api.pathshalait.com/api/v1/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === true) {
        localStorage.setItem("accessToken", responseData?.data?.access_token);
        localStorage.setItem("role", responseData?.data?.user_role);
        navigate("/root");
      } else {
        window.alert("Something went wrong! Knock developer!");
        console.log(responseData);
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center">
      <form
        onSubmit={handleRegister}
        action=""
        className="w-full md:w-1/2 lg:w-1/3 mx-5 md:mx-auto shadow flex flex-col gap-2.5 p-8 rounded-xl"
      >
        <p className="text-xl font-semibold text-center">Login</p>
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
        <Button color="blue" type="submit" className="flex items-center justify-center gap-2.5">
          Login {loading && <Spinner className="h-4 w-4" />}
        </Button>
      </form>
    </section>
  );
}

import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/");
  };
  return (
    <section className="min-h-screen flex items-center">
      <form
        onSubmit={handleRegister}
        action=""
        className="w-full md:w-1/2 lg:w-1/3 mx-5 md:mx-auto shadow flex flex-col gap-2.5 p-8 rounded-xl"
      >
        <p className="text-xl font-semibold text-center">Register</p>
        <Input color="blue" label="Phone Number" type="number" />
        <Input color="blue" label="Enter Name" type="text" />
        <Input color="blue" label="Enter Password" type="password" />
        <Input color="blue" label="Confirm Password" type="password" />
        <Button color="blue" type="submit">
          Register
        </Button>
      </form>
    </section>
  );
}

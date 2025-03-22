import { useState } from "react";

import { Link } from "@tanstack/react-router";
import { Button, TableHead } from "flowbite-react";
import { FlipInput } from "./FlipInput";
import { updateUser } from "../api/profile";
import { useAuth } from "../provider/authProvider";
import { Navbar } from "flowbite-react";

import "../reuse.css";

export const MainHeader = () => {
  const { cookies, updateCredits } = useAuth();
  const { name, email } = cookies.userData.record;
  // const { token } = cookies.userData;
  // const [clientName, changeClientName] = useState(name);

  // const submitCallback = async () => {
  //   const formData = new FormData();
  //   formData.append("name", clientName);
  //   const newData = await updateUser(cookies.userData.record, formData, token);
  //   await updateCredits(newData);
  // };

  return (
    <Navbar fluid rounded className=" shadow-md w-full fixed z-40">
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Flowbite Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Выйти</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/speciality">Специальности</Navbar.Link>
        <Navbar.Link href="/enrollee">Абитуриенты</Navbar.Link>
        <Navbar.Link href="/admissionList">Списки</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

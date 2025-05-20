import { Button } from "flowbite-react";
import { Navbar } from "flowbite-react";
// import { useCookies } from "react-cookie";

import "../reuse.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/store/globalSlice/userSlice";

export const MainHeader = () => {
  const [cookies, setCookie] = useCookies([
    "auth-token",
    "user-role",
    "user-blocked",
    "user-approved",
    "user-enrollled",
    "user-isCompleted",
  ]);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const navigate = useNavigate({ from: "/" });

  const headerSwitch = (role) => {
    switch (role) {
      case 1:
        return (
          <>
            {!cookies["user-blocked"] ? (
              <>
                <Navbar.Link href="/speciality">Специальности</Navbar.Link>
                <Navbar.Link href="/enrollee">Абитуриенты</Navbar.Link>
                <Navbar.Link href="/admissionList">Списки</Navbar.Link>
              </>
            ) : null}
          </>
        );
      case 0:
        return (
          <>
            {!cookies["user-blocked"] ? (
              <>
                <Navbar.Link href="/employee">Работники</Navbar.Link>
              </>
            ) : null}
          </>
        );
      default:
        return (
          <>
            {cookies["user-isCompleted"] ||
            cookies["user-enrollled"] ||
            cookies["user-approved"] ? null : (
              <Navbar.Link href="/home">Личная информация</Navbar.Link>
            )}

            {/* <Navbar.Link href="/application">Заявление</Navbar.Link> */}
          </>
        );
    }
  };

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
        <Button
          onClick={() => {
            dispatch(getUser({}));
            navigate({ to: "/" });

            setCookie("auth-token", null);
          }}
        >
          Выйти
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>{headerSwitch(cookies["user-role"])}</Navbar.Collapse>
    </Navbar>
  );
};

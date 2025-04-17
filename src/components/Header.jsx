import { Button } from "flowbite-react";
import { Navbar } from "flowbite-react";
import { useCookies } from "react-cookie";

import "../reuse.css";

export const MainHeader = () => {
  // const { cookies } = useAuth();
  const [cookies, setCookie] = useCookies(["userData"]);
  const { role } = cookies.userData.record;
  // const { token } = cookies.userData;
  // const [clientName, changeClientName] = useState(name);

  // const submitCallback = async () => {
  //   const formData = new FormData();
  //   formData.append("name", clientName);
  //   const newData = await updateUser(cookies.userData.record, formData, token);
  //   await updateCredits(newData);
  // };
  const headerSwitch = (role) => {
    switch (role) {
      case 0:
        return (
          <>
            <Navbar.Link href="/speciality">Специальности</Navbar.Link>
            <Navbar.Link href="/enrollee">Абитуриенты</Navbar.Link>
            <Navbar.Link href="/admissionList">Списки</Navbar.Link>
          </>
        );
      case 1:
        return (
          <>
            <Navbar.Link href="/employee">Работники</Navbar.Link>
          </>
        );
      default:
        return (
          <>
            <Navbar.Link href="/">Личная информация</Navbar.Link>
            <Navbar.Link href="/application">Заявление</Navbar.Link>
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
            setCookie("userData", null);
          }}
        >
          Выйти
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>{headerSwitch(role)}</Navbar.Collapse>
    </Navbar>
  );
};

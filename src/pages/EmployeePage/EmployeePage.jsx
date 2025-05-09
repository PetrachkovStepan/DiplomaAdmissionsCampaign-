import { useState, useContext } from "react";

import { Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";

import { AuthContext } from "@/context/AuthContext";
import { ApiContext } from "@/context/ApiContext";
import { useForm } from "@tanstack/react-form";
import { TableContainer } from "@/components/TableContainer";
import { Carrot, TrashBin } from "flowbite-react-icons/outline";
import { FloatingTextInput } from "@/components/FloatingTextInput";

import { addEmployee, changeEmloyee, removeEmployee } from "./employeeSlice";

import "../../reuse.css";
import "../../reuse.css";

export const EmployeePage = () => {
  const { authenticate, register } = useContext(AuthContext);
  const [isUpdate, setIsUpdate] = useState(false);

  const [isNewUser, setIsNewUser] = useState(false);

  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const handleAddEmloyee = () => {
    console.log("Created User");

    dispatch(addEmployee());
  };
  console.log(employee);
  // const form = useForm({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     name: "",
  //     role: 0,
  //     phoneNum: "",
  //     department: "",
  //     education: "",
  //     jobTitle: "",
  //     blocked: false,
  //   },
  //   onSubmit: async ({ value }) => {
  //     if (isNewUser) {
  //       await register(value);
  //     } else {
  //       await authenticate(value);
  //     }
  //   },
  // });

  const table_head = [
    "E-mail",
    "ФИО",
    "Телефон",
    "Отделение",
    "Образование",
    "Должность",
  ];
  const spec_data = [
    {
      id: "boofId",
      email: "teat@gmail.com",
      name: "Иванов Иван Иванович",
      phoneNum: "+375 (33) 333 33 33",
      department: "ФКП",
      education: "Бакалавр",
      jobTitle: "Ассистент кафедры",
    },
  ];

  return (
    <div className=" flex flex-row h-full">
      <TableContainer
        table_head={table_head}
        data={spec_data}
        editing={true}
        isBlockButton={true}
        isEditButton={true}
        isDeleteButton={true}
      />
      <form
        className="max-w-md mx-auto"
        onSubmit={(event) => {
          event.preventDefault();
          isUpdate ? handleAddEmloyee() : handleAddEmloyee();
        }}
      >
        <FloatingTextInput id_name={"email"} placeholder="e-mail" />
        <FloatingTextInput id_name={"name"} placeholder="ФИО" />
        <FloatingTextInput id_name={"password"} placeholder="Пароль" />
        <div className="grid md:grid-cols-2 md:gap-6">
          <FloatingTextInput id_name={"phoneNum"} placeholder="Телефон" />
          <FloatingTextInput id_name={"faculty"} placeholder="Отделение" />
        </div>
        <FloatingTextInput id_name={"education"} placeholder="Образование" />

        <FloatingTextInput id_name={"jobTitle"} placeholder="Должность" />
        <Button type="submit" className="mt-5 w-full">
          Добавить/Сохранить
        </Button>
      </form>
    </div>
  );
};

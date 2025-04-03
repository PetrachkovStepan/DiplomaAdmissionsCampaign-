import "../../reuse.css";

// import { useState } from "react";

import { Button } from "flowbite-react";
import { Carrot, TrashBin } from "flowbite-react-icons/outline";
import { FloatingTextInput } from "@/components/FloatingTextInput";

import "../../reuse.css";
import { TableContainer } from "@/components/TableContainer";

// import { useAuth } from "@/provider/authProvider";

export const EmployeePage = () => {
  // const { cookies } = useAuth();

  const table_head = [
    "E-mail",
    "ФИО",
    "Телефон",
    "Отделение",
    "Образование",
    "Должность",
    "Редактирование",
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
      buttons: (
        <div className=" flex flex-row gap-3">
          <Button outline={true} size="xs">
            Заблокировать
          </Button>
          <Button outline={true} size="xs">
            <Carrot />
          </Button>
          <Button outline={true} size="xs">
            <TrashBin />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className=" flex flex-row h-full">
      <TableContainer table_head={table_head} data={spec_data} />
      <form className="max-w-md mx-auto">
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

// import { useAuth } from "@/provider/authProvider";
// import { useState } from "react";

import { Button, Radio, Label, Datepicker, Textarea } from "flowbite-react";

import { TrashBin } from "flowbite-react-icons/outline";

import { FloatingTextInput } from "@/components/FloatingTextInput";
import "../../reuse.css";
import { useNavigate } from "@tanstack/react-router";
import { TableContainer } from "@/components/TableContainer";

export const Homepage = () => {
  // const { cookies } = useAuth();
  const navigate = useNavigate();
  const table_head = ["№", "Описание", ""];
  const data = [
    {
      id: "boofId",
      num: "1",
      desc: "Ахеревше крутая льгота ломающая баланс вселеннойхеревше крутая льгота ломающая баланс вселеннойхеревше крутая льгота ломающая баланс вселенной",
      buttons: (
        <div className="flex justify-center">
          <Button outline={true} size="xs">
            <TrashBin />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full">
      <form className="grid grid-cols-2 gap-4">
        <div className="сol-span-1  shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className=" text-lg">Паспортные данные</Label>
          </div>
          <FloatingTextInput id_name={"nameKir"} placeholder="ФИО кириллицей" />
          <FloatingTextInput id_name={"nameLat"} placeholder="ФИО латиницей" />
          <FloatingTextInput id_name={"series"} placeholder="Серия паспорта" />
          <FloatingTextInput id_name={"number"} placeholder="Номер паспорта" />
          <FloatingTextInput
            id_name={"idNum"}
            placeholder="Идентификационный номер"
          />
          <FloatingTextInput id_name={"givenByWhom"} placeholder="Кем выдан" />
          <div className="flex max-w-md flex-row gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="male">Дата рождения</Label>
              <Datepicker id_name={"birthDate"} language="ru" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="male">Дата выдачи</Label>
              <Datepicker id_name={"givenDate"} language="ru" />
            </div>
          </div>
          <div className="flex max-w-md flex-col gap-4 mt-4">
            <Label>Пол</Label>
            <div className="flex max-w-md flex-row gap-4">
              <div className="flex items-center gap-2">
                <Radio id="male" name="sex" value="male" defaultChecked />
                <Label htmlFor="male">Мужской</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="female" name="sex" value="female" />
                <Label htmlFor="female">Женский</Label>
              </div>
            </div>
          </div>
        </div>

        <div className=" shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className="text-lg">Образование</Label>
          </div>
          <FloatingTextInput
            id_name={"documentName"}
            placeholder="Документ об образовании"
          />
          <FloatingTextInput
            id_name={"educationType"}
            placeholder="Образование"
          />
          <FloatingTextInput
            id_name={"scoolType"}
            placeholder="Тип учреждения"
          />
          <FloatingTextInput
            id_name={"schoolName"}
            placeholder="Название учреждения"
          />
          <FloatingTextInput
            id_name={"foreighnLanguage"}
            placeholder="Ин. яз."
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="releaseDate">Дата окончания</Label>
            <Datepicker id_name={"releaseDate"} language="ru" />
          </div>
        </div>
        <div className="col-span-2 shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className="text-lg">Льготы</Label>
          </div>
          <div className=" grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between gap-4">
              <Textarea />
              <Button>Добавить льготу</Button>
            </div>
            <TableContainer
              table_head={table_head}
              data={data}
            ></TableContainer>
          </div>
        </div>
        <Button
          type="submit"
          className="my-5 w-full col-span-2"
          size="xl"
          onSubmit={() => {
            // e.preventDefault();
            navigate("/admissionList");
          }}
        >
          Продолжить
        </Button>
      </form>
    </div>
  );
};

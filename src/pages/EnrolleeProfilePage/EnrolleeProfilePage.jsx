import { useState } from "react";

import { Select, TextInput, ToggleSwitch } from "flowbite-react";
import { Button, Datepicker, Label, Radio, Textarea } from "flowbite-react";

import { useNavigate } from "@tanstack/react-router";
import { TrashBin } from "flowbite-react-icons/outline";
import { TableContainer } from "@/components/TableContainer";
import { FloatingTextInput } from "@/components/FloatingTextInput";

import "../../reuse.css";

export const EnrolleeProfilePage = () => {
  // const { cookies } = useAuth();
  const navigate = useNavigate();
  const exam_table_head = ["Пердмет", "Балл", ""];
  const exam_data = [
    {
      id: "boofId",
      subgect: "Математика",
      mark: 100,
      buttons: (
        <div className="flex w-[30px] justify-center">
          <Button outline={true} size="xs" color="red">
            <TrashBin />
          </Button>
        </div>
      ),
    },
  ];
  const benefit_table_head = ["№", "Описание"];
  const benefit_data = [
    {
      id: "boofId2",
      num: 1,
      desc: "Ахеревше крутая льгота ломающая баланс вселеннойхеревше крутая льгота ломающая баланс вселеннойхеревше крутая льгота ломающая баланс вселенной",
    },
  ];
  return (
    <div className=" flex flex-col">
      <form className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <article className=" shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className="text-lg">Экзамены</Label>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 justify-between">
                <Select id="subgect" disabled={false}>
                  <option value={"blank"}>Предмет...</option>
                  <option value={"math"}>Математика</option>
                  <option value={"physics"}>Физика</option>
                  <option value={"rus"}>Русский язык</option>
                  <option value={"bel"}>Белорусский язык</option>
                  <option value={"eng"}>Английский язык</option>
                </Select>
                <TextInput
                  type="number"
                  max={100}
                  min={0}
                  placeholder="балл..."
                />
              </div>
              <Button>Добавить сертификат</Button>
            </div>
            <TableContainer
              table_head={exam_table_head}
              data={exam_data}
            ></TableContainer>
          </div>
        </article>

        <article className=" shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className="text-lg">Льготы</Label>
          </div>
          <div className="flex flex-col gap-4">
            <Select id="subgect" disabled={false}>
              <option value={"blank"}>Категория абитуриента...</option>
              <option value={"math"}>1</option>
              <option value={"physics"}>2</option>
              <option value={"rus"}>3</option>
              <option value={"bel"}>4</option>
            </Select>
            <TableContainer
              table_head={benefit_table_head}
              data={benefit_data}
            ></TableContainer>
          </div>
        </article>
        <Button
          type="submit"
          className="mt-5 w-full col-span-2"
          size="xl"
          onSubmit={() => {
            // e.preventDefault();
            navigate("/admissionList");
          }}
        >
          Одобрить заявку
        </Button>
        <Button
          type="submit"
          className="mb-5 w-full col-span-2"
          size="xl"
          color="red"
          onSubmit={() => {
            // e.preventDefault();
            navigate("/admissionList");
          }}
        >
          Отклонить заявку
        </Button>
      </form>
    </div>
  );
};

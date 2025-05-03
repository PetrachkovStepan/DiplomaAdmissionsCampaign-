import { useState } from "react";

import { Button, Select } from "flowbite-react";

// import { useAuth } from "../../provider/authProvider";

import "../../reuse.css";
import { TableContainer } from "@/components/TableContainer";

export const AdmissionListPage = () => {
  // const { cookies } = useAuth();
  const [specFilter, setSpecFilter] = useState(true);
  // const [specFilterData, setSpecFilterData] = useState("blank");
  // const [facultyFilterData, setFacultyFilterData] = useState("blank");
  const table_head = [
    "№ специальности",
    "Имя спец.",
    "Факультет",
    "ФИО студента",
    "Балл",
    "Категория",
  ];
  const list_data = [
    {
      id: "boofId1",
      spec_num: "1-39 01 01",
      spec_name: "ИСИТ(БМ)",
      faculty: "ФКП",
      student_name: "Иванов Иван Иванович",
      points: 320,
      is_benefits: "1",
    },
    {
      id: "boofId2",
      spec_num: "1-39 01 01",
      spec_name: "ИСИТ(БМ)",
      faculty: "ФКП",
      student_name: "Иванов Иван Иванович",
      points: 320,
      is_benefits: "2",
    },
    {
      id: "boofId3",
      spec_num: "1-39 01 01",
      spec_name: "ИСИТ(БМ)",
      faculty: "ФКП",
      student_name: "Иванов Иван Иванович",
      points: 320,
      is_benefits: "2",
    },
  ];

  return (
    <div className=" flex flex-col gap-5  h-full">
      <div className="flex flex-row w-full justify-center gap-5">
        <Button>Создать список поступивших</Button>
        <Select
          id="faculties"
          onChange={(e) => {
            if (e.target.value == "blank") {
              setSpecFilter(true);
            } else {
              setSpecFilter(false);
            }
          }}
        >
          <option value={"blank"}>Факультет</option>
          <option value={"ФКП"}>ФКП</option>
          <option value={"ФРЭ"}>ФРЭ</option>
        </Select>
        <Select id="specialities" disabled={specFilter}>
          <option value={"blank"}>Cпециальность</option>
          <option value={"1"}>специальность 1</option>
          <option value={"2"}>специальность 2</option>
          <option value={"3"}>специальность 3</option>
          <option value={"4"}>специальность 4</option>
        </Select>
        <Button>Применить фильтры</Button>
        <Button disabled={true}>Скачать</Button>
      </div>
      <div className=" flex h-full justify-center">
        <TableContainer table_head={table_head} data={list_data} />
      </div>
    </div>
  );
};

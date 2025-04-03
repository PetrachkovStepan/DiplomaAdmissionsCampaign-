import { Button, Select } from "flowbite-react";

import "../../reuse.css";
import { TableContainer } from "@/components/TableContainer";

// import { useAuth } from "@/provider/authProvider";

export const ApplicationPage = () => {
  // const { cookies } = useAuth();

  const table_head = ["№", "Имя специальности", "Факультет", "Редактирование"];
  const spec_data = [
    {
      id: "boofId",
      num: "1-39 01 01",
      name: "Информационные системы и технологии обработки кала (в кабель менеджменте)",
      faculty: "ФКП",
      edit: (
        <div className="flex flex-rowitems-center gap-4">
          <Button size="xs">+</Button>
          <Button size="xs">-</Button>
          <Button size="xs" color="red">
            *
          </Button>
        </div>
      ),
    },
    {
      id: "boofId1",
      num: "1-39 01 01",
      name: "Информационные системы и технологии обработки кала (в кабель менеджменте)",
      faculty: "ФКП",
      edit: (
        <div className="flex flex-rowitems-center gap-4">
          <Button size="xs">+</Button>
          <Button size="xs">-</Button>
          <Button size="xs" color="red">
            *
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className=" flex flex-col h-full gap-4">
      <form className=" flex w-full gap-4 flex-row items-center justify-center">
        <Select id={"spec_num"}>
          <option value={"blank"}>Факультет</option>
          <option value={"ФКП"}>ФКП</option>
          <option value={"ФРЭ"}>ФРЭ</option>
        </Select>
        <Select id={"spec_name"}>
          <option value={"blank"}>Cпециальность</option>
          <option value={"1"}>специальность 1</option>
          <option value={"2"}>специальность 2</option>
          <option value={"3"}>специальность 3</option>
          <option value={"4"}>специальность 4</option>
        </Select>
        <Button type="submit" className="">
          Добавить
        </Button>
      </form>
      <TableContainer table_head={table_head} data={spec_data} />
      <Button className="">Скaчать заявление</Button>
    </div>
  );
};

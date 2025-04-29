import { Button, Select } from "flowbite-react";

import "../../reuse.css";
import { TableContainer } from "@/components/TableContainer";
import { FlowbiteIcons } from "flowbite-react-icons";
import { AngleDown, AngleUp, TrashBin } from "flowbite-react-icons/outline";
import { useState } from "react";
// import { useAuth } from "@/provider/authProvider";

export const ApplicationPage = () => {
  // const { cookies } = useAuth();
  const [specFilter, setSpecFilter] = useState(true);
  const [buttonActive, setButtonActive] = useState(true);

  const table_head = ["№", "Имя специальности", "Факультет", "Редактирование"];
  const spec_data = [
    {
      id: "boofId",
      num: "1-39 01 01",
      name: "Информационные системы и технологии обработки кала (в кабель менеджменте)",
      faculty: "ФКП",
      edit: (
        <FlowbiteIcons size={16}>
          <div className="flex flex-rowitems-center gap-4">
            <Button outline={true} size="xs">
              <AngleUp />
            </Button>
            <Button outline={true} size="xs">
              <AngleDown />
            </Button>
            <Button size="xs" outline={true}>
              <TrashBin />
            </Button>
          </div>
        </FlowbiteIcons>
      ),
    },
    {
      id: "boofId1",
      num: "1-39 01 01",
      name: "Информационные системы и технологии обработки кала (в кабель менеджменте)",
      faculty: "ФКП",
      edit: (
        <FlowbiteIcons size={16}>
          <div className="flex flex-rowitems-center gap-4">
            <Button outline={true} size="xs">
              <AngleUp />
            </Button>
            <Button outline={true} size="xs">
              <AngleDown />
            </Button>
            <Button size="xs" outline={true}>
              <TrashBin />
            </Button>
          </div>
        </FlowbiteIcons>
      ),
    },
  ];

  return (
    <div className=" flex flex-col h-full gap-4">
      <form className=" flex w-full gap-4 flex-row items-center justify-center">
        <Select
          id={"spec_num"}
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
        <Select
          id={"spec_name"}
          disabled={specFilter}
          onChange={(e) => {
            if (e.target.value == "blank") {
              setButtonActive(true);
            } else {
              setButtonActive(false);
            }
          }}
        >
          <option value={"blank"}>Cпециальность</option>
          <option value={"1"}>специальность 1</option>
          <option value={"2"}>специальность 2</option>
          <option value={"3"}>специальность 3</option>
          <option value={"4"}>специальность 4</option>
        </Select>
        <Button type="submit" disabled={buttonActive}>
          Добавить
        </Button>
      </form>
      <TableContainer table_head={table_head} data={spec_data} />
      <Button className="">Скaчать заявление</Button>
    </div>
  );
};

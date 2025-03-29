import { useState } from "react";

import { Button, Select, ToggleSwitch } from "flowbite-react";

import "../../reuse.css";
import { TableContainer } from "@/components/TableContainer";
import { useNavigate } from "@tanstack/react-router";

export const EnrolleePage = () => {
  // const { cookies } = useAuth();
  const [approve_switch, setApproveSwitch] = useState(false);
  const navigate = useNavigate();

  const table_head = [
    "№",
    "ФИО",
    "Статус заявки",
    "Дата подачи",
    "Редактирование",
  ];
  const enrollee_list_data = [
    {
      id: "boofId",
      num: "001",
      name: "Иванов Иван Иванович",
      status: "Одобрена",
      commitionDate: "12-12-2025",
      buttons: (
        <div className=" flex flex-row gap-3">
          <Button
            outline={true}
            size="xs"
            onClick={() => {
              navigate({
                to: "/enrolleeprofile",
              });
            }}
          >
            Рассмотреть заявку
          </Button>
          <Button outline={true} size="xs">
            Удалить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className=" flex flex-col">
      <div className="flex flex-row w-full justify-center gap-5">
        <Button>Создать список поступивших</Button>

        <ToggleSwitch
          checked={approve_switch}
          label="не одобрено"
          onChange={setApproveSwitch}
        />
        <Select id="specialities" disabled={false}>
          <option value={"blank"}>Cортировать по</option>
          <option value={"1"}>ФИО</option>
          <option value={"2"}>Дате подачи</option>
        </Select>
        <Button disabled={true}>Скачать список поступивших</Button>
      </div>
      <TableContainer table_head={table_head} data={enrollee_list_data} />
    </div>
  );
};

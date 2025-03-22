import { useState } from "react";

import { Button, Select, ToggleSwitch } from "flowbite-react";

import "../../reuse.css";

export const EnrolleeProfilePage = () => {
  // const { cookies } = useAuth();
  const [approve_switch, setApproveSwitch] = useState(false);
  // const { cookies } = useAuth();

  

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
    </div>
  );
};

import { useContext, useState } from "react";

import { Button, ToggleSwitch } from "flowbite-react";

import { FloatingTextInput } from "@/components/FloatingTextInput";

import { Carrot, TrashBin } from "flowbite-react-icons/outline";
import "../../reuse.css";
import { TableContainer } from "@/components/TableContainer";

import { ApiContext } from "@/context/ApiContext";

export const SpecialityPage = () => {
  const [military_switch, setMilitarySwitch] = useState(false);
  const { getListOfEntities } = useContext(ApiContext);

  let getAllSpec = async () => {
    console.log(
      await getListOfEntities("Speciality", {
        expand: [],
        fields: [],
        page: -1,
        perPage: -1,
        sort: [],
        filter: [],
        skipTotal: -1,
      })
    );
  };
  getAllSpec();

  const table_head = [
    "№",
    "Имя спец.",
    "Факультет",
    "Бюджетных мест",
    "Осталось",
    "Платных мест",
    "Осталось",
    "Редактирование",
  ];
  const spec_data = [
    {
      id: "boofId",
      num: "1-39 01 01",
      name: "ИСИТ(БМ)",
      faculty: "ФКП",
      budget_spots: 20,
      budget_free_spots: 20,
      paid_spots: 20,
      paid_free_spots: 20,
      buttons: (
        <div className=" flex flex-row gap-3">
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
        <FloatingTextInput
          id_name={"spec_num"}
          placeholder="Номер специальности"
        />
        <FloatingTextInput
          id_name={"spec_name"}
          placeholder="Имя специальности"
        />
        <FloatingTextInput id_name={"faculty"} placeholder="Факультет" />
        <div className="grid md:grid-cols-2 md:gap-6">
          <FloatingTextInput
            id_name={"budget_spot_count"}
            placeholder="Бюджетных мест"
          />
          <FloatingTextInput
            id_name={"paid_spot_count"}
            placeholder="Платных мест"
          />
        </div>
        <ToggleSwitch
          checked={military_switch}
          label="Военизированная специальность"
          onChange={setMilitarySwitch}
        />
        <Button type="submit" className="mt-5 w-full">
          Добавить
        </Button>
      </form>
    </div>
  );
};

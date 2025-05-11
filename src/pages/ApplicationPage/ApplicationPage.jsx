import { Button, Select } from "flowbite-react";

import "../../reuse.css";
import { useContext, useEffect, useState } from "react";
import { ApplicationTable } from "@/components/tables/ApplicationTable";
import { useDispatch, useSelector } from "react-redux";
import { ApiContext } from "@/context/ApiContext";

import { getChoices } from "./choiceSlice";
export const ApplicationPage = () => {
  const [specFilter, setSpecFilter] = useState(true);
  const [buttonActive, setButtonActive] = useState(true);
  const dispatch = useDispatch();
  const choice = useSelector((state) => state.choice.choice);
  const { getEntityById, getListOfEntities, createEntity } =
    useContext(ApiContext);

  useEffect(() => {
    getAllSpec();
    getAllChoices();
  }, []);
  const getAllSpec = async () => {
    const spec_data = await getListOfEntities("Speciality", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: [],
      skipTotal: -1,
    });
    // console.log(spec_data.data.items);

    // dispatch(getSpecialities(spec_data.data.items));
  };
  const getAllChoices = async () => {
    const choice_data = await getListOfEntities("ChoiceListItem", {
      expand: ["userId", "specialityId"],
      fields: [],
      page: -1,
      perPage: -1,
      sort: ["priority"],
      filter: [],
      skipTotal: -1,
    });
    console.log(choice_data.data.items);
    dispatch(getChoices(choice_data.data.items));
  };
  return (
    <div className=" flex flex-col h-full gap-4">
      <form className=" flex w-full gap-4 flex-row items-center justify-center">
        <Select
          id={"spec_num"}
          onChange={(e) => {
            if (e.target.value == "blank") {
              setSpecFilter(true);
              setButtonActive(true);
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
      <ApplicationTable data={choice} />
      <Button className="">Скaчать заявление</Button>
    </div>
  );
};

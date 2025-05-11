import { Button, Select } from "flowbite-react";

import "../../reuse.css";
import { useContext, useEffect, useState } from "react";
import { ApplicationTable } from "@/components/tables/ApplicationTable";
import { useDispatch, useSelector } from "react-redux";
import { ApiContext } from "@/context/ApiContext";

import { addChoices, getChoices } from "./choiceSlice";
import { useCookies } from "react-cookie";
import { printApplicationPDF } from "@/utils/print/printPDF";
export const ApplicationPage = () => {
  const [cookies, setCookie] = useCookies(["user-id"]);
  const [faculty, setFaculty] = useState("Факультет");
  const [speciality, setSpeciality] = useState("Специальность");
  const [specFilter, setSpecFilter] = useState(true);
  const [specFilterData, setSpecFilterData] = useState([
    { name: "Специальность", facultyName: "Факультет" },
  ]);
  const [facultyFilterData, setFacultyFilterData] = useState(["Факультет"]);
  const dispatch = useDispatch();
  const choice = useSelector((state) => state.choice.choice);
  const { getListOfEntities, createEntity, getEntityById, updateEntity } =
    useContext(ApiContext);

  useEffect(() => {
    getAllSpec();
    getAllChoices();
  }, []);
  const handleAddChoiceItem = async () => {
    const spec_data = await getListOfEntities("Speciality", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ['name="' + speciality + '"', 'facultyName="' + faculty + '"'],
      skipTotal: -1,
    });
    const choise_data = await createEntity("ChoiceListItem", {
      userId: cookies["user-id"],
      specialityId: spec_data.data.items[0].id,
      priority: choice.length,
    });
    dispatch(
      addChoices(
        await getEntityById("ChoiceListItem", choise_data.data.id, {
          expand: ["userId", "specialityId"],
          fields: [],
          page: -1,
          perPage: -1,
          sort: ["priority"],
          filter: [],
          skipTotal: -1,
        })
      )
    );
  };
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
    const facultyDefault = ["Факультет"];
    const specDefault = [{ name: "Специальность", facultyName: "Факультет" }];
    setFacultyFilterData(
      Array.from(
        new Set([
          ...facultyDefault,
          ...spec_data.data.items.map(({ facultyName }) => facultyName),
        ])
      )
    );
    setSpecFilterData([
      ...specDefault,
      ...spec_data.data.items.map(({ name, facultyName }) => ({
        name,
        facultyName,
      })),
    ]);
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
    dispatch(getChoices(choice_data.data.items));
  };
  const getEnrolled = async () => {
    await updateEntity("users", cookies["user-id"], { enrollled: true });
  };
  return (
    <div className=" flex flex-col h-full gap-4">
      <article className=" flex w-full gap-4 flex-row items-center justify-center">
        <Select
          id={"spec_num"}
          onChange={(e) => {
            setFaculty(e.target.value);
            if (e.target.value == "Факультет") {
              setSpecFilter(true);
            } else {
              setSpecFilter(false);
            }
          }}
        >
          {facultyFilterData.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select
          id={"spec_name"}
          disabled={specFilter}
          onChange={(e) => {
            setSpeciality(e.target.value);
          }}
        >
          {[
            ...[{ name: "Специальность", facultyName: "Факультет" }],
            ...specFilterData.filter((item) => item.facultyName === faculty),
          ].map((item, i) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
        <Button
          disabled={
            speciality == "Специальность" ||
            faculty == "Факультет" ||
            choice.length > 17
          }
          onClick={handleAddChoiceItem}
        >
          Добавить
        </Button>
      </article>
      <ApplicationTable data={choice} />
      <Button
        onClick={() => {
          printApplicationPDF(choice);
        }}
      >
        Скaчать заявление
      </Button>
      <Button onClick={getEnrolled}>Подать заявление</Button>
    </div>
  );
};

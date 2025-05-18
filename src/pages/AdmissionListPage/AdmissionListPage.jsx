import { useContext, useEffect, useState } from "react";

import { Button, Select } from "flowbite-react";
import { useCreateAddmissionList } from "@/api/addmissionList";
import { AddmissionTable } from "@/components/tables/AddmissionTable";
import { ApiContext } from "@/context/ApiContext";

export const AdmissionListPage = () => {
  const { createList } = useCreateAddmissionList();
  const { getListOfEntities } = useContext(ApiContext);
  const [admissionListData, setAdmissionListData] = useState([]);
  const [faculty, setFaculty] = useState("Факультет");
  const [speciality, setSpeciality] = useState("Специальность");
  const [specFilter, setSpecFilter] = useState(true);
  const [specFilterData, setSpecFilterData] = useState([
    { name: "Специальность", facultyName: "Факультет" },
  ]);
  const [facultyFilterData, setFacultyFilterData] = useState(["Факультет"]);

  useEffect(() => {
    getAllSpec();
    getAddmissionList();
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
  const getAddmissionList = async () => {
    console.log(specFilterData[0].name, facultyFilterData);

    const data = await getListOfEntities("AdmissionListItem", {
      expand: ["userId", "specialityId"],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: [],
      skipTotal: -1,
    });
    setAdmissionListData(data.data.items);
    return data.data.items;
  };
  const handleCreateAddmissionList = async () => {
    await createList();
    await getAddmissionList();
  };
  const handleApplyFilters = async () => {
    console.log(speciality);

    let data = await getAddmissionList();
    if (speciality != "Специальность") {
      data = data.filter((item) => item.expand.specialityId.name == speciality);
    }
    if (faculty != "Факультет") {
      data = data.filter(
        (item) => item.expand.specialityId.facultyName === faculty
      );
    }
    setAdmissionListData(data);
    // console.log(data);
  };
  return (
    <div className=" flex flex-col gap-5  h-full">
      <div className="flex flex-row w-full justify-center gap-5">
        <Button onClick={handleCreateAddmissionList}>
          Создать список поступивших
        </Button>
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
        <Button onClick={handleApplyFilters}>Применить фильтры</Button>
        <Button disabled={specFilter}>Скачать</Button>
      </div>
      <div className=" flex h-full justify-center">
        <AddmissionTable data={admissionListData} />
      </div>
    </div>
  );
};

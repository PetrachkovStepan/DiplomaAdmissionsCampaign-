import { useContext, useEffect, useState } from "react";

import { Label, Select } from "flowbite-react";
import { ApiContext } from "@/context/ApiContext";

import Chart from "react-apexcharts";
import {
  calculateAverageScore,
  extractFacultyData,
  extractStudyFormData,
  filterByFaculty,
  filterBySpeciality,
  getScoreDistributionByDecade,
} from "./statisticsCalculations";

export const StatisticsPage = () => {
  const { getListOfEntities } = useContext(ApiContext);
  const [admissionListData, setAdmissionListData] = useState([]);
  const [faculty, setFaculty] = useState("Факультет");
  const [speciality, setSpeciality] = useState("Специальность");
  const [specFilter, setSpecFilter] = useState(true);
  const [specFilterData, setSpecFilterData] = useState([
    { name: "Специальность", facultyName: "Факультет" },
  ]);
  const [facultyFilterData, setFacultyFilterData] = useState(["Факультет"]);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [],
    },
  ]);

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
  return (
    <div className=" flex flex-col gap-5  h-full mx-10">
      <div className="flex flex-row w-full gap-5">
        <Select
          id={"spec_num"}
          onChange={(e) => {
            setFaculty(e.target.value);
            if (e.target.value == "Факультет") {
              setSpeciality("Специальность");
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
      </div>
      <div className=" flex flex-col md:grid md:grid-cols-2 gap-5  h-full">
        <div className=" flex flex-col h-full gap-5 rounded-lg shadow-lg p-4">
          <Label className=" text-2xl font-bold">
            Факультет: {faculty == "Факультет" ? "НЕ ВЫБРАНО" : faculty},
            Специальность:{" "}
            {speciality == "Специальность" ? "НЕ ВЫБРАНО" : speciality}
          </Label>
          <Label className=" text-xl">
            Количество заявок: {admissionListData.length}
          </Label>
          <Label className=" text-xl">
            Средний балл по университету:{" "}
            {calculateAverageScore(admissionListData)}
          </Label>
          <Label className=" text-xl">
            Средний балл по факультету:{" "}
            {faculty == "Факультет"
              ? "НЕ ВЫБРАНО"
              : calculateAverageScore(
                  filterByFaculty(admissionListData, faculty)
                )}
          </Label>
          <Label className=" text-xl">
            Средний балл по специальности:{" "}
            {speciality == "Специальность"
              ? "НЕ ВЫБРАНО"
              : calculateAverageScore(
                  filterBySpeciality(
                    filterByFaculty(admissionListData, faculty),
                    speciality
                  )
                )}
          </Label>
        </div>
        <div className=" flex h-full flex-col rounded-lg shadow-lg p-4">
          <Label className=" text-2xl font-bold">Заявки по факультетам:</Label>
          {admissionListData.length == 0 ? null : (
            <Chart
              className="overflow-x-auto"
              options={{
                xaxis: {
                  categories:
                    getScoreDistributionByDecade(admissionListData).decades,
                },
              }}
              series={[
                {
                  data: getScoreDistributionByDecade(admissionListData).counts,
                },
              ]}
              // options={{
              //   labels: getScoreDistributionByDecade(admissionListData).decades,
              // }}
              // series={getScoreDistributionByDecade(admissionListData).counts}
              type="bar"
              width="500"
            />
          )}
        </div>
        <div className=" flex h-full donut flex-col rounded-lg shadow-lg p-4">
          <Label className=" text-2xl font-bold">Заявки по факультетам:</Label>
          {admissionListData.length == 0 ? null : (
            <Chart
              className="overflow-x-auto"
              options={{
                labels: extractFacultyData(admissionListData).facultyNames,
              }}
              series={extractFacultyData(admissionListData).applicantCounts}
              type="donut"
              width="400"
            />
          )}
        </div>
        <div className=" flex h-full donut flex-col rounded-lg shadow-lg p-4">
          <Label className=" text-2xl font-bold">
            Заявки по формам обучения:
          </Label>
          {admissionListData.length == 0 ? null : (
            <Chart
              className="overflow-x-auto"
              options={{
                labels: extractStudyFormData(admissionListData).studyForms,
              }}
              series={extractStudyFormData(admissionListData).applicantCounts}
              type="donut"
              width="400"
            />
          )}
        </div>
      </div>
    </div>
  );
};

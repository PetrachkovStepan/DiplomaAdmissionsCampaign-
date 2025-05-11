import { useContext, useEffect, useState } from "react";

import { Button, ToggleSwitch } from "flowbite-react";

import { TrashBin } from "flowbite-react-icons/outline";
import { TableContainer } from "@/components/TableContainer";
import { ApiContext } from "@/context/ApiContext";
import { EnrolleeTable } from "@/components/tables/EnrolleeTable";

export const EnrolleePage = () => {
  const [approve_switch, setApproveSwitch] = useState(false);
  const [enrolleeData, setEnrolleeData] = useState([]);
  const { getListOfEntities } = useContext(ApiContext);

  useEffect(() => {
    getAllEnrollee();
  }, []);
  const getAllEnrollee = async () => {
    const enrollee_data = await getListOfEntities("users", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ["role=2"],
      skipTotal: -1,
    });
    console.log(enrollee_data.data.items);
    setEnrolleeData(enrollee_data.data.items);
  };
  return (
    <div className=" flex flex-col h-full w-full ">
      <div className="flex flex-row justify-center w-full gap-5 items-center mb-4">
        <ToggleSwitch
          checked={approve_switch}
          label="не одобрено"
          onChange={setApproveSwitch}
        />
      </div>
      <div className=" flex h-full justify-center">
        <EnrolleeTable data={enrolleeData}/>
      </div>
    </div>
  );
};

import { useContext, useEffect, useState } from "react";

import { ToggleSwitch } from "flowbite-react";
import { ApiContext } from "@/context/ApiContext";
import { EnrolleeTable } from "@/components/tables/EnrolleeTable";

export const EnrolleePage = () => {
  const [approve_switch, setApproveSwitch] = useState(false);
  const [enrolleeData, setEnrolleeData] = useState([]);
  const { getListOfEntities } = useContext(ApiContext);

  useEffect(() => {
    getAllEnrollee();
  }, [approve_switch]);
  const getAllEnrollee = async () => {
    const enrollee_data = await getListOfEntities("users", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ["role=2", "enrolled=true"],
      skipTotal: -1,
    });
    if (approve_switch) {
      setEnrolleeData(
        enrollee_data.data.items.filter((item) => !item.approved)
      );
      return;
    }
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
        <EnrolleeTable data={enrolleeData} />
      </div>
    </div>
  );
};

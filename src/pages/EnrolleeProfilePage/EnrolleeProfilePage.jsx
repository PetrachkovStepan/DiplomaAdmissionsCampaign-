import { useContext, useEffect, useState } from "react";

import { Label, Select } from "flowbite-react";

import { ApiContext } from "@/context/ApiContext";
import { useNavigate } from "@tanstack/react-router";
import { PassportForm } from "@/components/forms/PassportForm";
import { ExamSertificateForm } from "@/components/forms/ExamSertificateForm";
import { UserBenefitViewTable } from "@/components/tables/UserBenefitViewTable";

export const EnrolleeProfilePage = () => {
  const [benefit, setBenefit] = useState([]);
  const { getListOfEntities } = useContext(ApiContext);
  const navigate = useNavigate();
  useEffect(() => {
    getAllBenefits();
  }, []);
  const getAllBenefits = async () => {
    const data = await getListOfEntities("Benefit", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ['userId="' + "nj1i97a2rt11y0v" + '"'],
      skipTotal: -1,
    });
    console.log("data.data.items");
    console.log(data.data.items);
    setBenefit(data.data.items);
  };
  return (
    <div className=" flex flex-col">
      <PassportForm user_id={"nj1i97a2rt11y0v"}>
        <ExamSertificateForm user_id={"nj1i97a2rt11y0v"} />
        <article className=" shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className="text-lg">Льготы</Label>
          </div>
          <div className="flex flex-col gap-4">
            <Select id="subgect" disabled={false}>
              <option value={0}>Категория абитуриента...</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
            <UserBenefitViewTable data={benefit} />
          </div>
        </article>
      </PassportForm>
    </div>
  );
};

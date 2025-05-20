import { useContext, useEffect, useState } from "react";

import { Label, Select } from "flowbite-react";

import { ApiContext } from "@/context/ApiContext";
import { createFileRoute } from "@tanstack/react-router";
import { PassportForm } from "@/components/forms/PassportForm";
import { ExamSertificateForm } from "@/components/forms/ExamSertificateForm";
import { UserBenefitViewTable } from "@/components/tables/UserBenefitViewTable";

export const EnrolleeProfilePage = () => {
  const Route = createFileRoute("/enrolleeprofile")({});
  const { id } = Route.useSearch();
  const [benefit, setBenefit] = useState([]);
  const { getListOfEntities, updateEntity, getEntityById } =
    useContext(ApiContext);
  useEffect(() => {
    getAllBenefits();
  }, []);
  const updateUserCategory = async (category) => {
    await updateEntity("users", id, { category: category });
  };
  const getAllBenefits = async () => {
    const data = await getListOfEntities("Benefit", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ['userId="' + id + '"'],
      skipTotal: -1,
    });
    setBenefit(data.data.items);
  };

  return (
    <div className=" flex flex-col">
      <PassportForm user_id={id}>
        <ExamSertificateForm user_id={id} />
        <article className=" shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className="text-lg">Льготы</Label>
          </div>
          <div className="flex flex-col gap-4">
            <Select
              id="benefit"
              disabled={false}
              onChange={async (e) => {
                await updateUserCategory(e.target.value);
              }}
            >
              <option value={2}>Категория абитуриента...</option>
              <option value={0}>Льготная категория 0</option>
              <option value={1}>Льготная категория 1</option>
              <option value={2}>Льготная категория 2</option>
              <option value={3}>Льготная категория 3</option>
            </Select>
            <UserBenefitViewTable data={benefit} />
          </div>
        </article>
      </PassportForm>
    </div>
  );
};

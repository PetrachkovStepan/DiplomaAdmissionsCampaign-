import { Button, Label, Textarea } from "flowbite-react";

import { UserBenefitTable } from "@/components/tables/UserBenefitTable";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@/context/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { getBenefits, addBenefit } from "@/pages/HomePage/benefitSlice";
import { useCookies } from "react-cookie";

export const BenefitsForm = () => {
  const [description, setDescription] = useState("");
  const [cookies, setCookie] = useCookies(["user-id"]);
  const dispatch = useDispatch();
  const benefit = useSelector((state) => state.benefit.benefit);

  const { getListOfEntities, createEntity } = useContext(ApiContext);
  useEffect(() => {
    getAllBenefits();
  }, []);

  const createBenefit = async () => {
    const data = await createEntity("Benefit", {
      userId: cookies["user-id"],
      description: description,
    });
    dispatch(addBenefit(data.data));
  };
  const getAllBenefits = async () => {
    const data = await getListOfEntities("Benefit", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ['userId="' + cookies["user-id"] + '"'],
      skipTotal: -1,
    });
    console.log("data.data.items");
    console.log(data.data.items);

    dispatch(getBenefits(data.data.items));
  };
  return (
    <div className="col-span-2 shadow-md p-4 rounded-md">
      <div className="mb-4">
        <Label className="text-lg">Льготы</Label>
      </div>
      <div className=" grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Button onClick={createBenefit}>Добавить льготу</Button>
        </div>
        <UserBenefitTable data={benefit} />
      </div>
    </div>
  );
};

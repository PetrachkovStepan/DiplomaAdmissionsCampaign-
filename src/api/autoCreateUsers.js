import { ApiContext } from "@/context/ApiContext";

const { useContext } = require("react");

export const useAutoCreateUsers = () => {
  const { getListOfEntities, createEntity, getEntityById, updateEntity } =
    useContext(ApiContext);
};
export const useCreateAddmissionList = () => {
  const { getListOfEntities, createEntity, getEntityById, updateEntity } =
    useContext(ApiContext);
  const getAllUsers = async () => {
    const emloyee_data = await getListOfEntities("UniversityEmployeeInfo", {
      expand: ["userId"],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: [],
      skipTotal: -1,
    });
    console.log(emloyee_data.data.items);
  };
};

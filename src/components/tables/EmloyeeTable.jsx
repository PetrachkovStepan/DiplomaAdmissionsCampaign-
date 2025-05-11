/* eslint-disable react/prop-types */
import { useContext } from "react";

import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { ApiContext } from "@/context/ApiContext";
import { Carrot, TrashBin, Lock, LockOpen } from "flowbite-react-icons/outline";
import {
  removeEmployee,
  blockEmloyee,
} from "@/pages/EmployeePage/employeeSlice";
import { changeEdit } from "@/store/globalSlice/isEditSlice";

export const EmloyeeTable = ({ data }) => {
  const dispatch = useDispatch();
  const { updateEntity } = useContext(ApiContext);
  const { entityDelete } = useContext(ApiContext);
  const deleteHandle = async (id, infoId) => {
    entityDelete("users", id);
    entityDelete("UniversityEmployeeInfo", infoId);
    console.log(id, infoId);
    
    dispatch(removeEmployee(infoId));
  };
  const updateHandle = (id) => {
    dispatch(changeEdit(id));
  };
  const blockHandle = async (id, blocked) => {
    await updateEntity("UniversityEmployeeInfo", id, { blocked: !blocked });

    dispatch(blockEmloyee(id));
  };
  return (
    <Table>
      <TableHead>
        <TableHeadCell className="text-center">E-mail</TableHeadCell>
        <TableHeadCell className="text-center">ФИО</TableHeadCell>
        <TableHeadCell className="text-center">Телефон</TableHeadCell>
        <TableHeadCell className="text-center">Отделение</TableHeadCell>
        <TableHeadCell className="text-center">Образование</TableHeadCell>
        <TableHeadCell className="text-center">Должность</TableHeadCell>
        <TableHeadCell className="text-center">Редактирование</TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className=" p-2 text-center">
              {item.expand.userId.email}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.userId.name}
            </TableCell>
            <TableCell className=" p-2 text-center">{item.phoneNum}</TableCell>
            <TableCell className=" p-2 text-center">
              {item.department}
            </TableCell>
            <TableCell className=" p-2 text-center">{item.education}</TableCell>
            <TableCell className=" p-2 text-center">{item.jobTitle}</TableCell>
            <TableCell className=" p-2 text-center">
              <div className=" flex flex-row gap-3">
                <Button
                  outline={true}
                  size="xs"
                  onClick={() => {
                    blockHandle(item.id, item.blocked);
                  }}
                >
                  {item.blocked ? <Lock /> : <LockOpen />}
                </Button>
                <Button
                  outline={true}
                  size="xs"
                  onClick={() => {
                    updateHandle(item.id);
                  }}
                >
                  <Carrot />
                </Button>
                <Button
                  outline={true}
                  size="xs"
                  onClick={() => {
                    deleteHandle(item.expand.userId.id, item.id);
                  }}
                >
                  <TrashBin />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

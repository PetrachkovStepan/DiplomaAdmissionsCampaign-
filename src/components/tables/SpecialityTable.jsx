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
import { Carrot, TrashBin } from "flowbite-react-icons/outline";
import { removeSpeciality } from "@/pages/SpecialityPage/specialitySlice";
import { changeEdit } from "@/store/globalSlice/isEditSlice";

export const SpecialityTable = ({ data }) => {
  const dispatch = useDispatch();
  const { entityDelete } = useContext(ApiContext);
  const deleteHandle = async (id) => {
    entityDelete("Speciality", id);
    dispatch(removeSpeciality(id));
  };
  const updateHandle = (id) => {
    dispatch(changeEdit(id));
  };
  return (
    <Table>
      <TableHead>
        <TableHeadCell className="text-center">№</TableHeadCell>
        <TableHeadCell className="text-center">Имя спец.</TableHeadCell>
        <TableHeadCell className="text-center">Факультет</TableHeadCell>
        <TableHeadCell className="text-center">Бюджетных мест</TableHeadCell>
        <TableHeadCell className="text-center">Осталось</TableHeadCell>
        <TableHeadCell className="text-center">Платных мест</TableHeadCell>
        <TableHeadCell className="text-center">Осталось</TableHeadCell>
        <TableHeadCell className="text-center">Редактирование</TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className=" p-2 text-center">{item.code}</TableCell>
            <TableCell className=" p-2 text-center">{item.name}</TableCell>
            <TableCell className=" p-2 text-center">
              {item.facultyName}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.budgetSpots}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.budgetSpots - item.budgetCount}
            </TableCell>
            <TableCell className=" p-2 text-center">{item.paidSpots}</TableCell>
            <TableCell className=" p-2 text-center">
              {item.paidSpots - item.paidCount}
            </TableCell>
            <TableCell className=" p-2 text-center">
              <div className=" flex flex-row gap-3">
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
                    deleteHandle(item.id);
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

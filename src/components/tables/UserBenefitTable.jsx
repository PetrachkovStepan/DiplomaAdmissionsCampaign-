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
import { TrashBin } from "flowbite-react-icons/outline";
import { removeBenefit } from "@/pages/HomePage/benefitSlice";

export const UserBenefitTable = ({ data }) => {
  const dispatch = useDispatch();
  const { entityDelete } = useContext(ApiContext);
  const deleteHandle = async (id) => {
    entityDelete("Benefit", id);
    dispatch(removeBenefit(id));
  };
  return (
    <Table>
      <TableHead>
        <TableHeadCell className="text-center">№</TableHeadCell>
        <TableHeadCell className="text-center">Описание</TableHeadCell>
        <TableHeadCell className="text-center">Редактирование</TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell className=" p-2 text-center">{i + 1}</TableCell>
            <TableCell className=" p-2 text-center">
              {item.description}
            </TableCell>

            <TableCell className=" p-2 flex justify-center">
                <Button
                  outline={true}
                  size="xs"
                  onClick={() => {
                    deleteHandle(item.id);
                  }}
                >
                  <TrashBin />
                </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

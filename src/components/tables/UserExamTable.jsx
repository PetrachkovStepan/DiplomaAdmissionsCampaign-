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
import { removeExam } from "@/pages/EnrolleeProfilePage/examSlice";

export const UserExamTable = ({ data }) => {
  const dispatch = useDispatch();
  const { entityDelete } = useContext(ApiContext);
  const deleteHandle = async (id) => {
    entityDelete("ExamCertificate", id);
    dispatch(removeExam(id));
  };
  return (
    <Table>
      <TableHead>
        <TableHeadCell className="text-center">Пердмет</TableHeadCell>
        <TableHeadCell className="text-center">Отметка</TableHeadCell>
        <TableHeadCell className="text-center">Балл</TableHeadCell>
        <TableHeadCell className="text-center"></TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className=" p-2 text-center">{item.subject}</TableCell>
            <TableCell className=" p-2 text-center">{item.mark}</TableCell>
            <TableCell className=" p-2 text-center">{item.score}</TableCell>

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

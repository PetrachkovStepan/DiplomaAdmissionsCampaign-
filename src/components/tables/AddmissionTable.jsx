/* eslint-disable react/prop-types */

import { Button } from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export const AddmissionTable = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableHeadCell className="text-center">№</TableHeadCell>
        <TableHeadCell className="text-center">№ специальности</TableHeadCell>
        <TableHeadCell className="text-center">Имя спец.</TableHeadCell>
        <TableHeadCell className="text-center">Факультет</TableHeadCell>
        <TableHeadCell className="text-center">ФИО студента</TableHeadCell>
        <TableHeadCell className="text-center">Балл</TableHeadCell>
        <TableHeadCell className="text-center">Категория</TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell className=" p-2 text-center">{i + 1}</TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.specialityId.code}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.specialityId.name}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.specialityId.facultyName}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.userId.name}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.userId.score}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.userId.category}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

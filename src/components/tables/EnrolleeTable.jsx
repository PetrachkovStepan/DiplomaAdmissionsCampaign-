/* eslint-disable react/prop-types */
import { useNavigate } from "@tanstack/react-router";
import { Button } from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export const EnrolleeTable = ({ data }) => {
  const navigate = useNavigate({ from: "/enrollee" });
  return (
    <Table>
      <TableHead>
        <TableHeadCell className="text-center">№</TableHeadCell>
        <TableHeadCell className="text-center">ФИО</TableHeadCell>
        <TableHeadCell className="text-center">Статус заявки</TableHeadCell>
        <TableHeadCell className="text-center">Дата подачи</TableHeadCell>
        <TableHeadCell className="text-center">Редактирование</TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell className=" p-2 text-center">{i + 1}</TableCell>
            <TableCell className=" p-2 text-center">{item.name}</TableCell>
            <TableCell className=" p-2 text-center">
              {item.approved ? "Одобрена" : "Не одобрена"}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.updated.slice(0, -8)}
            </TableCell>
            <TableCell className=" p-2 flex justify-center">
              <Button
                outline={true}
                onClick={() => {
                  navigate({
                    to: "/enrolleeprofile",
                    search: {
                      id: item?.id,
                    },
                  });
                }}
              >
                Рассмотреть
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

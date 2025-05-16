/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export const UserBenefitViewTable = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableHeadCell className="text-center">№</TableHeadCell>
        <TableHeadCell className="text-center">Описание</TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell className=" p-2 text-center">{i + 1}</TableCell>
            <TableCell className=" p-2 text-center">
              {item.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

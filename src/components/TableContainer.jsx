/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHead,
  TableRow,
} from "flowbite-react";
import PropTypes from "prop-types";

import "../reuse.css";

export const TableContainer = ({ table_head, data, editing, buttons }) => {
  return (
    <Table>
      <TableHead>
        {table_head.map((item, i) => (
          <TableHeadCell key={i} className="text-center">
            {item}
          </TableHeadCell>
        ))}
        {editing ? <TableHeadCell>Редактирование</TableHeadCell> : null}
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {Object.values(item)
              .slice(1)
              .map((item, i) => (
                <TableCell key={i} className=" p-2 text-center">
                  {item}
                </TableCell>
              ))}
            {buttons ? <TableCell>{buttons}</TableCell> : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
TableContainer.propTypes = {
  table_head: PropTypes.array,
  data: PropTypes.array,
  editing: PropTypes.bool,
};

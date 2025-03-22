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

export const TableContainer = ({ table_head, data }) => {
  return (
    <Table>
      <TableHead>
        {table_head.map((item, i) => (
          <TableHeadCell key={i}>{item}</TableHeadCell>
        ))}
        <TableHeadCell></TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {Object.values(item)
              .slice(1)
              .map((item, i) => (
                <TableCell key={i}>{item}</TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
TableContainer.propTypes = {
  table_head: PropTypes.array,
  data: PropTypes.array,
};

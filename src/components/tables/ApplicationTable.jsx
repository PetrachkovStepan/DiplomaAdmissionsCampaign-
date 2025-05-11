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
import { AngleDown, AngleUp, TrashBin } from "flowbite-react-icons/outline";

import {
  removeChoices,
  upChoice,
  downChoice,
} from "@/pages/ApplicationPage/choiceSlice";

export const ApplicationTable = ({ data }) => {
  const dispatch = useDispatch();
  const { entityDelete, updateEntity } = useContext(ApiContext);
  const deleteHandle = async (id) => {
    entityDelete("ChoiceListItem", id);
    dispatch(removeChoices(id));
  };
  const changeHandle = async (id, priority, changeParam, prevId) => {
    await updateEntity("ChoiceListItem", id, { priority: priority });
    await updateEntity("ChoiceListItem", prevId, {
      priority: changeParam == "up" ? priority + 1 : priority - 1,
    });
    if (changeParam == "up") {
      dispatch(upChoice(id));
    } else {
      dispatch(downChoice(id));
    }
  };

  return (
    <Table>
      <TableHead>
        <TableHeadCell className="text-center">№</TableHeadCell>
        <TableHeadCell className="text-center">Имя специальности</TableHeadCell>
        <TableHeadCell className="text-center">Факультет</TableHeadCell>
        <TableHeadCell className="text-center">Редактирование</TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell className=" p-2 text-center">{i + 1}</TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.specialityId.name}
            </TableCell>
            <TableCell className=" p-2 text-center">
              {item.expand.specialityId.facultyName}
            </TableCell>

            <TableCell className=" p-2 flex justify-center gap-4">
              <Button
                outline={true}
                size="xs"
                disabled={i == 0 ? true : false}
                onClick={() => {
                  changeHandle(item.id, i - 1, "up", data[i - 1].id);
                }}
              >
                <AngleUp />
              </Button>
              <Button
                outline={true}
                size="xs"
                disabled={i == data.length - 1 ? true : false}
                onClick={() => {
                  changeHandle(item.id, i + 1, "down", data[i + 1].id);
                }}
              >
                <AngleDown />
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

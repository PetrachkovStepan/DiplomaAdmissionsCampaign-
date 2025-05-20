/* eslint-disable react/prop-types */
import { useContext, useState } from "react";

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
import { useCookies } from "react-cookie";
import { notification } from "antd";
import { ModalContainer } from "../ModalContainer";

export const EmloyeeTable = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [cookies, setCookie] = useCookies(["user-id"]);
  const dispatch = useDispatch();
  const { updateEntity } = useContext(ApiContext);
  const { entityDelete } = useContext(ApiContext);
  const deleteHandle = async (id, infoId) => {
    if (cookies["user-id"] == id) {
      notification["error"]({
        message: "Ошибка",
        description: "Нельзя удалить себя",
      });
    } else {
      entityDelete("users", id);
      entityDelete("UniversityEmployeeInfo", infoId);
      dispatch(removeEmployee(infoId));
    }
  };
  const updateHandle = (id) => {
    dispatch(changeEdit(id));
  };
  const blockHandle = async (usedId, id, blocked) => {
    if (cookies["user-id"] == usedId) {
      notification["error"]({
        message: "Ошибка",
        description: "Нельзя заблокировать себя",
      });
    } else {
      await updateEntity("UniversityEmployeeInfo", id, { blocked: !blocked });

      dispatch(blockEmloyee(id));
    }
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableHeadCell className="text-center">Роль</TableHeadCell>
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
                {item.expand.userId.role ? "Сотр." : "Адм."}
              </TableCell>
              <TableCell className=" p-2 text-center">
                {item.expand.userId.name}
              </TableCell>
              <TableCell className=" p-2 text-center">
                {item.phoneNum}
              </TableCell>
              <TableCell className=" p-2 text-center">
                {item.department}
              </TableCell>
              <TableCell className=" p-2 text-center">
                {item.education}
              </TableCell>
              <TableCell className=" p-2 text-center">
                {item.jobTitle}
              </TableCell>
              <TableCell className=" p-2 text-center">
                <div className=" flex flex-row gap-3">
                  <Button
                    outline={true}
                    size="xs"
                    onClick={() => {
                      blockHandle(item.expand.userId.id, item.id, item.blocked);
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
                      setOpenModal(true);
                    }}
                  >
                    <TrashBin />
                  </Button>
                </div>
                <ModalContainer
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  header={"Удаление работника"}
                  body={
                    "Вы действительно хотите удалить профиль работника, это действие необратимо?"
                  }
                  handleAccept={() => {
                    deleteHandle(item.expand.userId.id, item.id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

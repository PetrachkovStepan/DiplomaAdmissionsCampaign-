/* eslint-disable react/prop-types */
import { Button, Label, Select, TextInput } from "flowbite-react";

import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@/context/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { UserExamTable } from "../tables/UserExamTable";
import { addExams, getExams } from "@/pages/EnrolleeProfilePage/examSlice";
import { hasDuplicateSubject } from "@/utils/validators";
import { notification } from "antd";

export const ExamSertificateForm = ({ user_id }) => {
  const [subject, setSubject] = useState("blank");
  const [mark, setMark] = useState(0);
  const [score, setScore] = useState(0);

  const dispatch = useDispatch();
  const exam = useSelector((state) => state.exam.exam);

  const { getListOfEntities, createEntity } = useContext(ApiContext);
  useEffect(() => {
    getAllCertificates();
  }, []);

  const createCertificate = async () => {
    if (subject == "blank") {
      notification["error"]({
        message: "Ошибка",
        description: "Выберите предмет",
      });
      return;
    }
    if (hasDuplicateSubject(exam, { subject: subject })) {
      notification["error"]({
        message: "Ошибка",
        description: "Экзамен с таким предметом уже есть",
      });
      return;
    }
    if (exam.length < 4) {
      const data = await createEntity("ExamCertificate", {
        userId: user_id,
        subject: subject,
        mark: mark,
        score: score,
      });
      dispatch(addExams(data.data));
    }
  };
  const getAllCertificates = async () => {
    const data = await getListOfEntities("ExamCertificate", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ['userId="' + user_id + '"'],
      skipTotal: -1,
    });

    dispatch(getExams(data.data.items));
  };
  return (
    <article className=" shadow-md p-4 rounded-md">
      <div className="mb-4">
        <Label className="text-lg">Экзамены</Label>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 justify-between items-center">
            <Select
              id="subgect"
              disabled={false}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            >
              <option value={"blank"}>Предмет...</option>
              <option value={"Аттестат"}>Аттестат</option>
              <option value={"Математика"}>Математика</option>
              <option value={"Физика"}>Физика</option>
              <option value={"Биология"}>Биология</option>
              <option value={"Рус/Бел язык"}>Рус/Бел язык</option>
              <option value={"Химия"}>Химия</option>
              <option value={"История"}>История</option>
              <option value={"Английский язык"}>Английский язык</option>
              <option value={"Обществоведение"}>Обществоведение</option>
              <option value={"География"}>География</option>
            </Select>
            <div className="flex flex-row items-center gap-4">
              <Label>Оценка:</Label>
              <TextInput
                type="number"
                value={mark}
                onChange={(e) => {
                  setMark(e.target.value);
                }}
                max={10}
                min={0}
                placeholder="оценка..."
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <Label>Балл:</Label>
              <TextInput
                type="number"
                value={score}
                onChange={(e) => {
                  setScore(e.target.value);
                }}
                max={100}
                min={0}
                placeholder="балл..."
              />
            </div>
          </div>
          <Button onClick={createCertificate}>Добавить сертификат</Button>
        </div>
        <UserExamTable data={exam} />
      </div>
    </article>
  );
};

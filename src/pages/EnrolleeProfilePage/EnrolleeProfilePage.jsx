import { Select, TextInput } from "flowbite-react";
import { Button, Datepicker, Label, Radio } from "flowbite-react";

import { useNavigate } from "@tanstack/react-router";
import { TrashBin } from "flowbite-react-icons/outline";
import { TableContainer } from "@/components/TableContainer";
import { FloatingTextInput } from "@/components/FloatingTextInput";

import "../../reuse.css";
import { PassportForm } from "@/components/forms/PassportForm";

export const EnrolleeProfilePage = () => {
  const navigate = useNavigate();
  const exam_table_head = ["Пердмет", "Балл", ""];
  const exam_data = [
    {
      id: "boofId",
      subgect: "Математика",
      mark: 100,
    },
  ];
  const benefit_table_head = ["№", "Описание"];
  const benefit_data = [
    {
      id: "boofId2",
      num: 1,
      desc: "Ахеревше крутая льгота ломающая баланс вселеннойхеревше крутая льгота ломающая баланс вселеннойхеревше крутая льгота ломающая баланс вселенной",
    },
  ];
  return (
    <div className=" flex flex-col">
      <PassportForm user_id={"nj1i97a2rt11y0v"}>
        <article className=" shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className="text-lg">Экзамены</Label>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 justify-between">
                <Select id="subgect" disabled={false}>
                  <option value={"blank"}>Предмет...</option>
                  <option value={"math"}>Математика</option>
                  <option value={"physics"}>Физика</option>
                  <option value={"rus"}>Русский язык</option>
                  <option value={"bel"}>Белорусский язык</option>
                  <option value={"eng"}>Английский язык</option>
                </Select>
                <TextInput
                  type="number"
                  max={100}
                  min={0}
                  placeholder="балл..."
                />
              </div>
              <Button>Добавить сертификат</Button>
            </div>
            <TableContainer
              table_head={exam_table_head}
              data={exam_data}
              buttons={
                <div className="flex w-[30px] justify-center">
                  <Button outline={true} size="xs" color="red">
                    <TrashBin />
                  </Button>
                </div>
              }
            ></TableContainer>
          </div>
        </article>
        <article className=" shadow-md p-4 rounded-md">
          <div className="mb-4">
            <Label className="text-lg">Льготы</Label>
          </div>
          <div className="flex flex-col gap-4">
            <Select id="subgect" disabled={false}>
              <option value={"blank"}>Категория абитуриента...</option>
              <option value={"math"}>1</option>
              <option value={"physics"}>2</option>
              <option value={"rus"}>3</option>
              <option value={"bel"}>4</option>
            </Select>
            <TableContainer
              table_head={benefit_table_head}
              data={benefit_data}
            ></TableContainer>
          </div>
        </article>
      </PassportForm>
      {/* <form className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          type="submit"
          className="mt-5 w-full col-span-2"
          size="xl"
          onSubmit={() => {
            // e.preventDefault();
            navigate("/admissionList");
          }}
        >
          Одобрить заявку
        </Button>
        <Button
          type="submit"
          className="mb-5 w-full col-span-2"
          size="xl"
          color="red"
          onSubmit={() => {
            // e.preventDefault();
            navigate("/admissionList");
          }}
        >
          Отклонить заявку
        </Button>
      </form> */}
    </div>
  );
};

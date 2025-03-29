// import { useAuth } from "@/provider/authProvider";
// import { useState } from "react";

import { Button, Radio, Label, Datepicker } from "flowbite-react";

import { FloatingTextInput } from "@/components/FloatingTextInput";
import "../../reuse.css";

export const Homepage = () => {
  // const { cookies } = useAuth();

  return (
    <>
      <div className="w-full h-full">
        <form className="max-w-md mx-auto">
          <div>
            <FloatingTextInput
              id_name={"nameKir"}
              placeholder="ФИО кириллицей"
            />
            <FloatingTextInput
              id_name={"nameLat"}
              placeholder="ФИО латиницей"
            />
            <FloatingTextInput
              id_name={"series"}
              placeholder="Серия паспорта"
            />
            <FloatingTextInput
              id_name={"number"}
              placeholder="Номер паспорта"
            />
            <FloatingTextInput
              id_name={"idNum"}
              placeholder="Идентификационный номер"
            />
            <FloatingTextInput
              id_name={"givenByWhom"}
              placeholder="Кем выдан"
            />
            <div className="flex max-w-md flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="male">Дата рождения</Label>
                <Datepicker id_name={"birthDate"} language="ru" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="male">Дата выдачи</Label>
                <Datepicker id_name={"givenDate"} language="ru" />
              </div>
            </div>
            <div className="flex max-w-md flex-col gap-4 mt-4">
              <Label>Пол</Label>
              <div className="flex max-w-md flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Radio id="male" name="sex" value="male" defaultChecked />
                  <Label htmlFor="male">Мужской</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="female" name="sex" value="female" />
                  <Label htmlFor="female">Женский</Label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <FloatingTextInput
              id_name={"documentName"}
              placeholder="Документ об образовании"
            />
            <FloatingTextInput
              id_name={"educationType"}
              placeholder="Образование"
            />
            <FloatingTextInput
              id_name={"scoolType"}
              placeholder="Тип учреждения"
            />
            <FloatingTextInput
              id_name={"schoolName"}
              placeholder="Название учреждения"
            />
            <FloatingTextInput
              id_name={"releaseDate"}
              placeholder="Дата окончания"
            />
            <FloatingTextInput
              id_name={"foreighnLanguage"}
              placeholder="Ин. яз."
            />
          </div>
          <Button type="submit" className="mt-5 w-full">
            Продолжить
          </Button>
        </form>
      </div>
    </>
  );
};

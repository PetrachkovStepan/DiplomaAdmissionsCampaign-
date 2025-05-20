/* eslint-disable react/no-children-prop */
import { useContext, useEffect } from "react";

import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "@tanstack/react-form";
import { ApiContext } from "@/context/ApiContext";
import {
  specCheck,
  validateInteger,
  validateSpecCode,
} from "@/utils/validators";
import { changeEdit } from "@/store/globalSlice/isEditSlice";
import { SpecialityTable } from "@/components/tables/SpecialityTable";

import {
  addSpeciality,
  changeSpeciality,
  getSpecialities,
} from "./specialitySlice";

import "../../reuse.css";
import FormInput from "@/universalComponents/FormInput";
import { notification } from "antd";

export const SpecialityPage = () => {
  const dispatch = useDispatch();
  const speciality = useSelector((state) => state.speciality.speciality);
  const isEdit = useSelector((state) => state.isEdit);
  const { getEntityById, getListOfEntities, createEntity, updateEntity } =
    useContext(ApiContext);

  useEffect(() => {
    getAllSpec();
  }, []);
  useEffect(() => {
    if (isEdit.isEdit) {
      getOneSpec();
    }
  }, [isEdit]);

  const getAllSpec = async () => {
    const spec_data = await getListOfEntities("Speciality", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: [],
      skipTotal: -1,
    });
    dispatch(getSpecialities(spec_data.data.items));
  };

  const getOneSpec = async () => {
    const spec_data = await getEntityById("Speciality", isEdit.id, {
      expand: [],
      fields: [],
    });
    form.reset(spec_data);
  };
  const form = useForm({
    defaultValues: {
      code: "",
      facultyName: "",
      name: "",
      fullTimeBudgetPlaces: 0,
      fullTimePaidPlaces: 0,
      partTimeBudgetPlaces: 0,
      partTimePaidPlaces: 0,
      distanceBudgetPlaces: 0,
      distancePaidPlaces: 0,
    },
    onSubmit: async ({ value }) => {
      const errorChecker = specCheck(speciality, value);
      if (errorChecker.isNameDuplicate) {
        notification["error"]({
          message: "Ошибка",
          description: "Специальность с таким именем уже есть",
        });
        return;
      }
      if (errorChecker.isNumberDuplicate) {
        notification["error"]({
          message: "Ошибка",
          description: "Специальность с таким номером уже есть",
        });
        return;
      }
      if (!isEdit.isEdit) {
        const entity = await createEntity("Speciality", value);
        dispatch(addSpeciality(entity.data));
        
        form.reset(form.defaultValues);
      } else {
        const entity = await updateEntity("Speciality", isEdit.id, value);
        dispatch(changeEdit(""));
        dispatch(changeSpeciality(entity));
        form.reset(form.defaultValues);
      }
    },
  });

  return (
    <div className=" flex flex-col-reverse lg:flex-row  h-full">
      <div className="flex h-full overflow-x-auto mt-5 lg:mt-0 shadow-lg">
        <SpecialityTable data={speciality} />
      </div>
      <form
        className=" mx-5"
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="code"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Обязательное поле"
                : !validateSpecCode(value)
                  ? "Неверный формат"
                  : undefined,
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"code"}
                  id={field.name}
                  isRequired={true}
                  errorMessage={field.state.meta.errors.join(", ")}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Номер специальности"
                />
              </>
            );
          }}
        />
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Обязательное поле"
                : value.length < 2
                  ? "Имя должно иметь минимум 2 символа"
                  : undefined,
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"spec_name"}
                  id={field.name}
                  isRequired={true}
                  errorMessage={field.state.meta.errors.join(", ")}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Имя специальности"
                />
              </>
            );
          }}
        />
        <form.Field
          name="facultyName"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "Факультет должен иметь минимум 3 символа"
                  : undefined,
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"faculty"}
                  id={field.name}
                  isRequired={true}
                  errorMessage={field.state.meta.errors.join(", ")}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Факультет"
                />
              </>
            );
          }}
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <form.Field
            name="fullTimeBudgetPlaces"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Обязательное поле"
                  : !validateInteger(value)
                    ? "Неверный формат"
                    : undefined,
            }}
            children={(field) => {
              return (
                <>
                  <FormInput
                    id_name={"fullTimeBudgetPlaces"}
                    id={field.name}
                    isRequired={true}
                    errorMessage={field.state.meta.errors.join(", ")}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Б. дневных мест"
                  />
                </>
              );
            }}
          />
          <form.Field
            name="fullTimePaidPlaces"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Обязательное поле"
                  : !validateInteger(value)
                    ? "Неверный формат"
                    : undefined,
            }}
            children={(field) => {
              return (
                <>
                  <FormInput
                    id_name={"fullTimePaidPlaces"}
                    id={field.name}
                    isRequired={true}
                    errorMessage={field.state.meta.errors.join(", ")}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Пл. дневных мест"
                  />
                </>
              );
            }}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <form.Field
            name="partTimeBudgetPlaces"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Обязательное поле"
                  : !validateInteger(value)
                    ? "Неверный формат"
                    : undefined,
            }}
            children={(field) => {
              return (
                <>
                  <FormInput
                    id_name={"partTimeBudgetPlaces"}
                    id={field.name}
                    isRequired={true}
                    errorMessage={field.state.meta.errors.join(", ")}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Б. заочных мест"
                  />
                </>
              );
            }}
          />
          <form.Field
            name="partTimePaidPlaces"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Обязательное поле"
                  : !validateInteger(value)
                    ? "Неверный формат"
                    : undefined,
            }}
            children={(field) => {
              return (
                <>
                  <FormInput
                    id_name={"partTimePaidPlaces"}
                    id={field.name}
                    isRequired={true}
                    errorMessage={field.state.meta.errors.join(", ")}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Пл. заочных мест"
                  />
                </>
              );
            }}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <form.Field
            name="distanceBudgetPlaces"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Обязательное поле"
                  : !validateInteger(value)
                    ? "Неверный формат"
                    : undefined,
            }}
            children={(field) => {
              return (
                <>
                  <FormInput
                    id_name={"distanceBudgetPlaces"}
                    id={field.name}
                    isRequired={true}
                    errorMessage={field.state.meta.errors.join(", ")}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Б. дист. мест"
                  />
                </>
              );
            }}
          />
          <form.Field
            name="distancePaidPlaces"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Обязательное поле"
                  : !validateInteger(value)
                    ? "Неверный формат"
                    : undefined,
            }}
            children={(field) => {
              return (
                <>
                  <FormInput
                    id_name={"distancePaidPlaces"}
                    id={field.name}
                    isRequired={true}
                    errorMessage={field.state.meta.errors.join(", ")}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Пл. дист. мест"
                  />
                </>
              );
            }}
          />
        </div>
        <Button type="submit" className="mt-5 w-full">
          {!isEdit.isEdit ? "Добавить" : "Сохранить"}
        </Button>
      </form>
    </div>
  );
};

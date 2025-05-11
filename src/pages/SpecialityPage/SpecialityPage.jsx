/* eslint-disable react/no-children-prop */
import { useContext, useEffect } from "react";

import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "@tanstack/react-form";
import { ApiContext } from "@/context/ApiContext";
import { validateSpecCode } from "@/utils/validators";
import { changeEdit } from "@/store/globalSlice/isEditSlice";
import { FloatingTextInput } from "@/components/FloatingTextInput";
import { SpecialityTable } from "@/components/tables/SpecialityTable";

import {
  addSpeciality,
  changeSpeciality,
  getSpecialities,
} from "./specialitySlice";

import "../../reuse.css";

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
      budgetBarrier: 0,
      budgetCount: 0,
      budgetSpots: 0,
      paidBarrier: 0,
      paidCount: 0,
      paidSpots: 0,
    },
    onSubmit: async ({ value }) => {
      if (!isEdit.isEdit) {
        const entity = await createEntity("Speciality", value);
        dispatch(addSpeciality(entity.data));
      } else {
        const entity = await updateEntity("Speciality", isEdit.id, value);
        dispatch(changeEdit(""));
        dispatch(changeSpeciality(entity));
        form.reset(form.defaultValues);
      }
    },
  });

  return (
    <div className=" flex flex-row h-full">
      <SpecialityTable data={speciality} />
      <form
        className="max-w-md mx-auto"
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="code"
          validators={{
            onChange: ({ value }) =>
              !validateSpecCode(value) ? "Неверный формат" : undefined,
          }}
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"code"}
                  id={field.name}
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
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"spec_name"}
                  id={field.name}
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
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"faculty"}
                  id={field.name}
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
            name="budgetSpots"
            children={(field) => {
              return (
                <>
                  <FloatingTextInput
                    id_name={"budget_spot_count"}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Бюджетных мест"
                  />
                </>
              );
            }}
          />
          <form.Field
            name="paidSpots"
            children={(field) => {
              return (
                <>
                  <FloatingTextInput
                    id_name={"paid_spot_count"}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Платных мест"
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

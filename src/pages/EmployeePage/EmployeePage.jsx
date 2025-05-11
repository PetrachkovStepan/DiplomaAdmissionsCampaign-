/* eslint-disable react/no-children-prop */
import { useContext, useEffect, useState } from "react";

import { Button, Label, ToggleSwitch } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";

import { ApiContext } from "@/context/ApiContext";
import { useForm } from "@tanstack/react-form";
import { FloatingTextInput } from "@/components/FloatingTextInput";

import { getEmployees, addEmployee, changeEmloyee } from "./employeeSlice";

import { changeEdit } from "@/store/globalSlice/isEditSlice";
import "../../reuse.css";
import "../../reuse.css";
import { EmloyeeTable } from "@/components/tables/EmloyeeTable";

export const EmployeePage = () => {
  const [role, setRole] = useState(false);
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const isEdit = useSelector((state) => state.isEdit);
  const { getEntityById, getListOfEntities, createEntity, updateEntity } =
    useContext(ApiContext);

  useEffect(() => {
    getAllEmployees();
  }, []);
  useEffect(() => {
    if (isEdit.isEdit) {
      getOneEmployee();
    }
  }, [isEdit]);

  const getAllEmployees = async () => {
    const emloyee_data = await getListOfEntities("UniversityEmployeeInfo", {
      expand: ["userId"],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: [],
      skipTotal: -1,
    });
    console.log(emloyee_data.data.items);

    dispatch(getEmployees(emloyee_data.data.items));
  };
  const getOneEmployee = async () => {
    const data = await getEntityById("UniversityEmployeeInfo", isEdit.id, {
      expand: ["userId"],
      fields: [],
    });
    data.email = data.expand.userId.email;
    data.name = data.expand.userId.name;
    data.password = "";
    data.role = data.expand.userId.role;
    form.reset(data);
  };
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: 0,
      phoneNum: "",
      department: "",
      education: "",
      jobTitle: "",
      blocked: false,
    },
    onSubmit: async ({ value }) => {
      if (!isEdit.isEdit) {
        const entity = await createEntity("users", {
          email: value.email,
          password: value.password,
          passwordConfirm: value.password,
          name: value.name,
          role: value.role,
        });
        const entityInfo = await createEntity("UniversityEmployeeInfo", {
          userId: entity.data.id,
          phoneNum: value.phoneNum,
          department: value.department,
          education: value.education,
          jobTitle: value.jobTitle,
          blocked: false,
        });
        await updateEntity("users", entity.data.id, {
          emailVisibility: true,
        });
        dispatch(
          addEmployee(
            await getEntityById("UniversityEmployeeInfo", entityInfo.data.id, {
              expand: ["userId"],
              fields: [],
            })
          )
        );
        form.reset(form.defaultValues);
      } else {
        value.password = null;
        await updateEntity("UniversityEmployeeInfo", isEdit.id, value);
        await updateEntity("users", value.expand.userId.id, {
          email: value.email,
          name: value.name,
          role: value.role,
        });
        value.password = "";
        dispatch(changeEdit(""));
        dispatch(changeEmloyee(value));
        form.reset(form.defaultValues);
      }
    },
  });
  return (
    <div className=" flex flex-row h-full">
      <EmloyeeTable data={employee} />
      <form
        className="max-w-md mx-auto"
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"email"}
                  id={field.email}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e-mail"
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
                  id_name={"name"}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="ФИО"
                />
              </>
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  type="password"
                  id_name={"password"}
                  required={!isEdit.isEdit}
                  id={field.password}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Пароль"
                />
              </>
            );
          }}
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <form.Field
            name="phoneNum"
            children={(field) => {
              return (
                <>
                  <FloatingTextInput
                    id_name={"phoneNum"}
                    id={field.phoneNum}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Телефон"
                  />
                </>
              );
            }}
          />
          <form.Field
            name="department"
            children={(field) => {
              return (
                <>
                  <FloatingTextInput
                    id_name={"department"}
                    id={field.department}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Отделение"
                  />
                </>
              );
            }}
          />
        </div>
        <form.Field
          name="education"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"education"}
                  id={field.education}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Образование"
                />
              </>
            );
          }}
        />
        <form.Field
          name="jobTitle"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"jobTitle"}
                  id={field.jobTitle}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Должность"
                />
              </>
            );
          }}
        />

        <form.Field
          name="role"
          children={(field) => {
            return (
              <>
                <ToggleSwitch
                  checked={field.state.value}
                  label={field.state.value ? "Работник" : "Администратор"}
                  id_name={"role"}
                  id={field.role}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e);
                  }}
                />
              </>
            );
          }}
        />
        <Button type="submit" className="mt-5 w-full">
          {!isEdit.isEdit ? "Добавить" : "Сохранить"}
        </Button>
      </form>
    </div>
  );
};

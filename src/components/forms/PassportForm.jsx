/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */

import { Button, Radio, Label, Datepicker } from "flowbite-react";

import { FloatingTextInput } from "@/components/FloatingTextInput";
import "../../reuse.css";

import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "@tanstack/react-form";
import { ApiContext } from "@/context/ApiContext";
import { useNavigate } from "@tanstack/react-router";

export const PassportForm = ({ children }) => {
  const navigate = useNavigate({ from: "/" });
  const [cookies, setCookie] = useCookies(["user-id"]);
  const { getListOfEntities, updateEntity } = useContext(ApiContext);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const passport = await getListOfEntities("Passport", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ['userId="' + cookies["user-id"] + '"'],
      skipTotal: -1,
    });
    const education = await getListOfEntities("EducationCertificate", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ['userId="' + cookies["user-id"] + '"'],
      skipTotal: -1,
    });
    form.reset({
      passport: passport.data.items[0],
      education: education.data.items[0],
    });
  };

  const form = useForm({
    defaultValues: {
      passport: {
        id: "",
        idNum: "",
        series: "",
        number: "",
        nameLat: "",
        nameKir: "",
        sex: "male",
        birthDate: new Date(),
        givenDate: new Date(),
        givenByWhom: "",
      },
      education: {
        id: "",
        score: 0,
        documentName: "",
        scoolType: "",
        schoolName: "",
        releaseDate: new Date(),
        foreighnLanguage: "English",
        educationType: "",
      },
    },
    onSubmit: async ({ value }) => {
      await updateEntity("Passport", value.passport.id, value.passport);
      await updateEntity(
        "EducationCertificate",
        value.education.id,
        value.education
      );
      navigate({to:"/application"});
    },
  });
  return (
    <form
      className="grid grid-cols-2 gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="сol-span-1  shadow-md p-4 rounded-md">
        <div className="mb-4">
          <Label className=" text-lg">Паспортные данные</Label>
        </div>
        <form.Field
          name="passport"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"passport.nameKir"}
                  id={field.name}
                  value={field.state.value.nameKir}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      nameKir: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="ФИО кириллицей"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"passport.nameLat"}
                  id={field.name}
                  value={field.state.value.nameLat}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      nameLat: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="ФИО латиницей"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"passport.series"}
                  id={field.name}
                  value={field.state.value.series}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      series: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Серия паспорта"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"passport.number"}
                  id={field.name}
                  value={field.state.value.number}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      number: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Номер паспорта"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"passport.idNum"}
                  id={field.name}
                  value={field.state.value.idNum}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      idNum: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Идентификационный номер"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"passport.givenByWhom"}
                  id={field.name}
                  value={field.state.value.givenByWhom}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      givenByWhom: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Кем выдан"
                />
              </>
            );
          }}
        />
        <div className="flex max-w-md flex-row gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="male">Дата рождения</Label>
            <form.Field
              name="passport"
              children={(field) => {
                return (
                  <>
                    <Datepicker
                      id_name={"passport.birthDate"}
                      id={field.name}
                      value={field.state.value.birthDate}
                      onChange={(e) => {
                        const newData = {
                          ...field.state.value,
                          birthDate: e,
                        };
                        field.handleChange(newData);
                      }}
                      language="ru"
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="male">Дата выдачи</Label>
            <form.Field
              name="passport"
              children={(field) => {
                return (
                  <>
                    <Datepicker
                      id_name={"passport.givenDate"}
                      id={field.name}
                      value={field.state.value.givenDate}
                      onChange={(e) => {
                        const newData = {
                          ...field.state.value,
                          givenDate: e,
                        };
                        field.handleChange(newData);
                      }}
                      language="ru"
                    />
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="flex max-w-md flex-col gap-4 mt-4">
          <Label>Пол</Label>
          <div className="flex max-w-md flex-row gap-4">
            <form.Field
              name="passport"
              children={(field) => {
                return (
                  <>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="male"
                        name="sex"
                        value="male"
                        checked={field.state.value.sex === "male"}
                        onChange={(e) => {
                          const newData = {
                            ...field.state.value,
                            sex: e.target.value,
                          };
                          field.handleChange(newData);
                        }}
                      />
                      <Label htmlFor="male">Мужской</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="female"
                        name="sex"
                        checked={field.state.value.sex === "female"}
                        onChange={(e) => {
                          const newData = {
                            ...field.state.value,
                            sex: e.target.value,
                          };
                          field.handleChange(newData);
                        }}
                        value="female"
                      />
                      <Label htmlFor="female">Женский</Label>
                    </div>
                  </>
                );
              }}
            />
          </div>
        </div>
      </div>

      <div className=" shadow-md p-4 rounded-md">
        <div className="mb-4">
          <Label className="text-lg">Образование</Label>
        </div>
        <form.Field
          name="education"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"education.documentName"}
                  id={field.name}
                  value={field.state.value.documentName}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      documentName: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Документ об образовании"
                />
              </>
            );
          }}
        />
        <form.Field
          name="education"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"education.educationType"}
                  id={field.name}
                  value={field.state.value.educationType}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      educationType: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Образование"
                />
              </>
            );
          }}
        />
        <form.Field
          name="education"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"education.scoolType"}
                  id={field.name}
                  value={field.state.value.scoolType}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      scoolType: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Тип учреждения"
                />
              </>
            );
          }}
        />
        <form.Field
          name="education"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"education.schoolName"}
                  id={field.name}
                  value={field.state.value.schoolName}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      schoolName: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Название учреждения"
                />
              </>
            );
          }}
        />
        <form.Field
          name="education"
          children={(field) => {
            return (
              <>
                <FloatingTextInput
                  id_name={"education.foreighnLanguage"}
                  id={field.name}
                  value={field.state.value.foreighnLanguage}
                  onChange={(e) => {
                    const newData = {
                      ...field.state.value,
                      foreighnLanguage: e.target.value,
                    };
                    field.handleChange(newData);
                  }}
                  placeholder="Ин. яз."
                />
              </>
            );
          }}
        />
        <div className="flex flex-col gap-2">
          <Label htmlFor="releaseDate">Дата окончания</Label>
          <form.Field
            name="education"
            children={(field) => {
              return (
                <>
                  <Datepicker
                    id_name={"education.releaseDate"}
                    id={field.name}
                    value={field.state.value.releaseDate}
                    onChange={(e) => {
                      const newData = {
                        ...field.state.value,
                        releaseDate: e,
                      };
                      field.handleChange(newData);
                    }}
                    language="ru"
                  />
                </>
              );
            }}
          />
        </div>
      </div>
      {children}
      <Button type="submit" className="my-5 w-full col-span-2" size="xl">
        Продолжить
      </Button>
    </form>
  );
};

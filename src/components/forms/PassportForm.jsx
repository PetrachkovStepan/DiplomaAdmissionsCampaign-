/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */

import { Button, Radio, Label, Datepicker } from "flowbite-react";

import "../../reuse.css";

import { useContext, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { ApiContext } from "@/context/ApiContext";
import { useNavigate } from "@tanstack/react-router";
import { useCookies } from "react-cookie";
import FormInput from "@/universalComponents/FormInput";
import { validateIdNum } from "@/utils/validators";
import { useSelector } from "react-redux";
import { notification } from "antd";

export const PassportForm = ({ user_id, children }) => {
  const navigate = useNavigate({ from: "/" });
  const [cookies] = useCookies(["user-id"]);
  const { getListOfEntities, updateEntity } = useContext(ApiContext);
  const exam = useSelector((state) => state.exam.exam);

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
      filter: ['userId="' + user_id + '"'],
      skipTotal: -1,
    });
    const education = await getListOfEntities("EducationCertificate", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: [],
      filter: ['userId="' + user_id + '"'],
      skipTotal: -1,
    });
    form.reset({
      passport: passport.data.items[0],
      education: education.data.items[0],
    });
  };
  const updateUserApproval = async (param, value) => {
    if (exam.length != 4 && param == "approved") {
      notification["error"]({
        message: "Ошибка",
        description: "Не достаточно экзаминационных сертификатов",
      });
      return;
    }
    if (param == "enrolled") {
      console.log(await updateEntity("users", user_id, { approved: false }));
    }
    let score = 0;
    for (let i = 0; i < exam.length; i++) {
      score += exam[i].score;
    }
    console.log("SEND NOTIFICATION");
    await updateEntity("users", user_id, { [param]: value, score: score });
    form.handleSubmit();
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
        foreighnLanguage: "",
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
      if (cookies["user-role"] == "2") {
        navigate({ to: "/application" });
      } else {
        navigate({ to: "/enrollee" });
      }
    },
  });
  return (
    <form
      className="flex flex-col md:grid grid-cols-2 gap-4"
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
          name="passport.nameKir"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "ФИО должно иметь минимум 3 символа"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"passport.nameKir"}
                  id={field.name}
                  placeholder="ФИО кириллицей"
                  value={field.state.value}
                  isRequired={true}
                  errorMessage={field.state.meta.errors.join(", ")}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport.nameLat"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "ФИО должно иметь минимум 3 символа"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"passport.nameLat"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="ФИО латиницей"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport.series"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length != 2
                  ? "Неверный формат"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"passport.series"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="Серия паспорта"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport.number"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length != 7
                  ? "Номер паспорта должен иметь 7 символов"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"passport.number"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="Номер паспорта"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport.idNum"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : !validateIdNum(value)
                  ? "Неверный формат"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"passport.idNum"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="Идентификационный номер"
                />
              </>
            );
          }}
        />
        <form.Field
          name="passport.givenByWhom"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "Поле должно иметь минимум 3 символа"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"passport.givenByWhom"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
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
          name="education.documentName"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "Поле должно иметь минимум 3 символа"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"education.documentName"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="Документ об образовании"
                />
              </>
            );
          }}
        />
        <form.Field
          name="education.educationType"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "Поле должно иметь минимум 3 символа"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"education.educationType"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="Образование"
                />
              </>
            );
          }}
        />
        <form.Field
          name="education.scoolType"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "Поле должно иметь минимум 3 символа"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"education.scoolType"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="Тип учреждения"
                />
              </>
            );
          }}
        />
        <form.Field
          name="education.schoolName"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "Поле должно иметь минимум 3 символа"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"education.schoolName"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder="Название учреждения"
                />
              </>
            );
          }}
        />
        <form.Field
          name="education.foreighnLanguage"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Обязательное поле"
                : value.length < 3
                  ? "Поле должно иметь минимум 3 символа"
                  : undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <FormInput
                  id_name={"education.foreighnLanguage"}
                  id={field.name}
                  isRequired={true}
                  value={field.state.value}
                  metaError={field.state.meta.errors.join(", ")}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
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
      {cookies["user-role"] == "2" ? (
        <>
          <Button type="submit" className="my-5 w-full col-span-2" size="xl">
            Продолжить
          </Button>
        </>
      ) : (
        <>
          <Button
            type="button"
            className="mt-5 w-full col-span-2"
            size="xl"
            onClick={async (e) => {
              e.preventDefault();
              await updateUserApproval("approved", true);
            }}
          >
            Одобрить заявку
          </Button>
          <Button
            type="button"
            className="mb-5 w-full col-span-2"
            size="xl"
            color="red"
            onClick={async (e) => {
              e.preventDefault();
              await updateUserApproval("enrolled", false);
            }}
          >
            Отклонить заявку
          </Button>
        </>
      )}
    </form>
  );
};

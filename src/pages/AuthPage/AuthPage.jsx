/* eslint-disable react/no-children-prop */
import { Button } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "@tanstack/react-form";
import { Spin } from "antd";
import FormInput from "../../universalComponents/FormInput";

export const AuthPage = () => {
  const { authenticate, register } = useContext(AuthContext);

  const [isNewUser, setIsNewUser] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      if (isNewUser) {
        await register(value);
      } else {
        await authenticate(value);
      }
    },
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <div className="w-full h-full grid place-items-center relative">
        <div className="max-w-[90vw] max-h-[70vh] min-w-[30vw] min-h-[40vh] backdrop-blur-md flex flex-col p-5 items-center gap-6">
          <h1 className="text-xl">Электронный абитуриент</h1>
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div
              className="mb-5 cursor-pointer text-[#0e7490]"
              onClick={() => setIsNewUser((prev) => !prev)}
            >
              {!isNewUser ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            </div>
            <div className="flex flex-col items-start gap-4 w-full">
              {isNewUser && (
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "Обязательное поле"
                        : value.length < 3
                          ? "ФИО должно иметь минимум 3 символа"
                          : undefined,
                  }}
                  children={(field) => {
                    // Avoid hasty abstractions. Render props are great!
                    return (
                      <>
                        <FormInput
                          id={field.name}
                          placeholder={"ФИО"}
                          errorMessage={field.state.meta.errors.join(", ")}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </>
                    );
                  }}
                />
              )}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Обязательное поле"
                      : !validateEmail(value)
                        ? "Неверный формат почты"
                        : undefined,
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <FormInput
                        id={field.name}
                        placeholder={"Email"}
                        errorMessage={field.state.meta.errors.join(", ")}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </>
                  );
                }}
              />
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Обязательное поле"
                      : value.length < 8
                        ? "Пароль должен иметь минимум 8 символов"
                        : undefined,
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <FormInput
                        id={field.name}
                        inputType="password"
                        placeholder={"Пароль"}
                        errorMessage={field.state.meta.errors.join(", ")}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </>
                  );
                }}
              />
              <div className="mt-5 flex items-center gap-2 w-full flex-col">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit}>
                      <span className="font-semibold">
                        {isSubmitting ? (
                          <Spin />
                        ) : isNewUser ? (
                          "Зарегистрироваться"
                        ) : (
                          "Войти"
                        )}
                      </span>
                    </Button>
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

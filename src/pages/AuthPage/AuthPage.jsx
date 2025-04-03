/* eslint-disable react/no-children-prop */
import { Button, Label, TextInput } from "flowbite-react";
import { useAuthForm } from "../../hooks/useAuthForm";

export const AuthPage = () => {
  const { form, error, isProcessing } = useAuthForm();

  return (
    <div className=" grid place-items-center h-full">
      <form
        className=" grid grid-flow-row gap-3 w-72"
        onSubmitCapture={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Label
          className="place-self-center text-lg"
          value="Электронный абитуриент"
        />
        <form.Field
          name="login"
          validators={{
            onChange: ({ value }) =>
              value.length <= 0 ? "Field should not be empty" : undefined,
          }}
          children={(field) => {
            return (
              <TextInput
                id={field.name}
                value={field.state.value}
                type="email"
                placeholder={"name@gmail.com"}
                color={error ? "failure" : ""}
                required
                onChange={(e) => field.handleChange(e.target.value)}
              />
            );
          }}
        />
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              value.length <= 0 ? "Field should not be empty" : undefined,
          }}
          children={(field) => (
            <TextInput
              id={field.name}
              value={field.state.value}
              placeholder={"Пароль"}
              type="password"
              color={error ? "failure" : ""}
              required
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              isProcessing={isProcessing}
            >
              {isSubmitting ? "..." : "Войти"}
            </Button>
          )}
        />
      </form>
    </div>
  );
};

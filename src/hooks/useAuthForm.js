import { useForm } from "@tanstack/react-form";
import { login } from "../api/auth";
import { useAuth } from "../provider/authProvider";
import { useState } from "react";

export const useAuthForm = () => {
  const { setCookie } = useAuth();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsProcessing(true);
      login({
        identity: value.login,
        password: value.password,
      })
        .then((data) => {
          setCookie("userData", data, {
            expires: new Date(Date.now() + 604800000),
          });
          setIsProcessing(false);
        })
        .catch((e) => setError(e));
    },
  });

  return { form, error, isProcessing };
};

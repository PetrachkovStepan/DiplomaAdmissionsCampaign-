import { Label } from "flowbite-react";
import { useCookies } from "react-cookie";

export const DefaultPage = () => {
  const [cookies] = useCookies([
    "user-blocked",
    "user-isCompleted",
    "user-enrolled",
    "user-approved",
  ]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Label className="text-4xl  text-center">Электронный абитуриент</Label>
      <Label className="text-2xl my-4 text-gray-500 text-center">
        Добро пожаловать в систему
      </Label>
      <Label className="text-xl mt-5 text-[#0E7EA3]">
        {cookies["user-isCompleted"]
          ? "Поздравляем! Вы были зачислены в университет"
          : cookies["user-enrolled"]
            ? cookies["user-approved"]
              ? "Ваши документы рассмотрены, ожидайте результатов приемной кампании"
              : "Ваши документы на рассмотрении..."
            : null}
        {cookies["user-blocked"] ? "Ваш аккаунт был заблокирован" : null}
      </Label>
    </div>
  );
};

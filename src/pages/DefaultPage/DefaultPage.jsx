import { Label } from "flowbite-react";

export const DefaultPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Label className="text-4xl  text-center">Электронный абитуриент</Label>
      <Label className="text-2xl my-4 text-gray-500 text-center">
        Добро пожаловать в систему
      </Label>
    </div>
  );
};

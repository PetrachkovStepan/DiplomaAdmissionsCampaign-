import { PassportForm } from "@/components/forms/PassportForm";
import { BenefitsForm } from "@/components/forms/BenefitsForm";

import { useCookies } from "react-cookie";

export const Homepage = () => {
  const [cookies] = useCookies(["user-id"]);
  return (
    <div className="w-full h-full">
      <PassportForm user_id={cookies["user-id"]}>
        <BenefitsForm />
      </PassportForm>
    </div>
  );
};

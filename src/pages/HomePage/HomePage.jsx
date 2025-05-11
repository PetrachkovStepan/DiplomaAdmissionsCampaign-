import { PassportForm } from "@/components/forms/PassportForm";
import { BenefitsForm } from "@/components/forms/BenefitsForm";

export const Homepage = () => {
  return (
    <div className="w-full h-full">
      <PassportForm>
        <BenefitsForm />
      </PassportForm>
    </div>
  );
};

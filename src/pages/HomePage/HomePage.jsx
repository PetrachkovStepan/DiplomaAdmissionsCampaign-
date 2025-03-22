/* eslint-disable no-undef */
import { useAuth } from "@/provider/authProvider";
import { Link } from "@tanstack/react-router";
import "../../reuse.css";

export const Homepage = () => {
  const { cookies } = useAuth();

  return (
    <>
      <div className="w-full h-full grid place-items-center">
        <div className="flex gap-16 flex-col">
          <Link to="/speciality">View Spec-s</Link>
        </div>
      </div>
    </>
  );
};

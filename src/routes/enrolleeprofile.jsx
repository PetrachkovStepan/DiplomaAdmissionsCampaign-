import { createFileRoute } from "@tanstack/react-router";
import { EnrolleeProfilePage } from "../pages/EnrolleeProfilePage/EnrolleeProfilePage";

export const Route = createFileRoute("/enrolleeprofile")({ component: RouteComponent });

function RouteComponent() {
  return <EnrolleeProfilePage />;
}

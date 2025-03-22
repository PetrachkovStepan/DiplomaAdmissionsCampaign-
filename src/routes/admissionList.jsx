import { createFileRoute } from "@tanstack/react-router";
import { AdmissionListPage } from "../pages/AdmissionListPage/AdmissionListPage";

export const Route = createFileRoute("/admissionList")({ component: RouteComponent });

function RouteComponent() {
  return <AdmissionListPage />;
}

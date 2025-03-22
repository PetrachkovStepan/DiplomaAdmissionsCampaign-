import { createFileRoute } from "@tanstack/react-router";
import { EmployeePage } from "../pages/EmployeePage/EmployeePage";

export const Route = createFileRoute("/employee")({ component: RouteComponent });

function RouteComponent() {
  return <EmployeePage />;
}

import { createFileRoute } from "@tanstack/react-router";
import { SpecialityPage } from "@/pages/SpecialityPage/SpecialityPage";

export const Route = createFileRoute("/speciality")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SpecialityPage/>;
}

import { createFileRoute } from "@tanstack/react-router";
import { ApplicationPage } from "@/pages/ApplicationPage/ApplicationPage";

export const Route = createFileRoute("/speciality copy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ApplicationPage/>;
}

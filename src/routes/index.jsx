import { createFileRoute } from "@tanstack/react-router";
import { DefaultPage } from "@/pages/DefaultPage/DefaultPage";

export const Route = createFileRoute("/")({ component: RouteComponent });

function RouteComponent() {
  return <DefaultPage/>;
}

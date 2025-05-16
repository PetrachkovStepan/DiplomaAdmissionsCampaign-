import { createFileRoute } from "@tanstack/react-router";
import { Homepage } from "../pages/HomePage/HomePage";

export const Route = createFileRoute("/home")({ component: RouteComponent });

function RouteComponent() {
  return <Homepage />;
}

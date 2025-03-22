import { createFileRoute } from "@tanstack/react-router";
import { EnrolleePage } from "../pages/EnrolleePage/EnrolleePage";

export const Route = createFileRoute("/enrollee")({ component: RouteComponent });

function RouteComponent() {
  return <EnrolleePage />;
}

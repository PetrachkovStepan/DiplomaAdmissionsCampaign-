import { createFileRoute } from "@tanstack/react-router";
import { StatisticsPage } from "@/pages/StatisticsPage/StatisticsPage";

export const Route = createFileRoute("/statistics")({ component: RouteComponent });

function RouteComponent() {
  return <StatisticsPage />;
}

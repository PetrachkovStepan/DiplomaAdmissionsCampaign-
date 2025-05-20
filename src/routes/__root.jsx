import { createRootRoute, Outlet } from "@tanstack/react-router";

import { MainHeader } from "components/Header";
import { AuthPage } from "pages/AuthPage/AuthPage";
import { useCookies } from "react-cookie";

import "react";
import { PageContainer } from "@/pages/PageContainer/PageContainer";

export const Route = createRootRoute({ component: RootComponent });

function RootComponent() {
  const [cookies] = useCookies(["auth-token", "user-id"]);

  return (
    <div className="h-full">
      {cookies["auth-token"] ? (
        <>
          <MainHeader />
          <PageContainer>
            <Outlet />
          </PageContainer>
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

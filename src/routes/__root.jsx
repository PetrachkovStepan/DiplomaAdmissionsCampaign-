import { createRootRoute, Outlet } from "@tanstack/react-router";

import { useAuth } from "provider/authProvider";
import { MainHeader } from "components/Header";
import { AuthPage } from "pages/AuthPage/AuthPage";
import { ShortLinkProvider } from "provider/shortLinkProvider";

import "react";
import { PageContainer } from "@/pages/PageContainer/PageContainer";

export const Route = createRootRoute({ component: RootComponent });

function RootComponent() {
  const { cookies } = useAuth();

  return (
    <div className="h-full">
      {cookies?.userData?.token ? (
        <>
          <ShortLinkProvider>
            <MainHeader />
            <PageContainer>
              <Outlet />
            </PageContainer>
          </ShortLinkProvider>
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

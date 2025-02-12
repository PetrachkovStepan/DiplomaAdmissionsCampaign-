import "react";
import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../provider/authProvider";
import { AuthPage } from "../pages/AuthPage/AuthPage";
import { MainSidebar } from "../components/Sidebar";
import { ShortLinkProvider } from "../provider/shortLinkProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { cookies } = useAuth();

  return (
    <div className='h-full grid place-items-center relative'>
      {cookies?.userData?.token ? (
        <>
          <ShortLinkProvider>
            <MainSidebar />
            <Outlet />
          </ShortLinkProvider>
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

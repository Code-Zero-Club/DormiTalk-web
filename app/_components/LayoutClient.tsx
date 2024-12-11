"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Nav from "./Nav";
import SaveDrawer from "./SaveDrawer";

const NO_NAVIGATION_ROUTES = ["/login"] as const;
type NavigationRoutes = (typeof NO_NAVIGATION_ROUTES)[number];

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({
  children,
}: LayoutClientProps): ReactNode {
  const pathname = usePathname();
  const hideNavigation = NO_NAVIGATION_ROUTES.includes(
    pathname as NavigationRoutes
  );

  const hideSaveButton = pathname !== "/scheduler";

  let headerTitle = "도미톡!";

  if (pathname === "/") {
    headerTitle = "홈";
  } else if (pathname === "/playlist") {
    headerTitle = "플레이리스트";
  } else if (pathname === "/scheduler") {
    headerTitle = "스케줄러";
  } else if (pathname === "/setting") {
    headerTitle = "설정";
  }

  return (
    <div className="flex justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md relative flex flex-col h-screen">
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          containerStyle={{
            bottom: 150,
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        {!hideNavigation && <Header title={headerTitle} />}
        <div
          className={`flex-1 overflow-y-auto ${
            hideNavigation ? "" : "pt-[60px] pb-16"
          }`}
        >
          {children}
        </div>
        {!hideSaveButton && <SaveDrawer />}
        {!hideNavigation && <Nav />}
      </div>
    </div>
  );
}

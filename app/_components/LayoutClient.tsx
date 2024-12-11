"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Nav from "./Nav";
import SaveDrawer from "./SaveDrawer";
import { AuthService } from "@/app/services/auth.service";
import { toast } from "react-hot-toast";

const NO_NAVIGATION_ROUTES = ["/login"] as const;
type NavigationRoutes = (typeof NO_NAVIGATION_ROUTES)[number];

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({
  children,
}: LayoutClientProps): ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const hideNavigation = NO_NAVIGATION_ROUTES.includes(
    pathname as NavigationRoutes
  );

  const hideSaveButton = pathname !== "/scheduler";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pathname !== "/login" && !AuthService.isAuthenticated()) {
          if (!isInitialLoad) {
            toast.error("로그인이 필요합니다");
          }
          await router.push("/login");
        } else if (pathname === "/login" && AuthService.isAuthenticated()) {
          await router.push("/");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsCheckingAuth(false);
        setIsInitialLoad(false);
      }
    };

    checkAuth();
  }, [pathname, router, isInitialLoad]);

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

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="w-full max-w-md h-screen flex items-center justify-center">
          <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
        </div>
      </div>
    );
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

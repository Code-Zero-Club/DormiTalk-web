"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import Header from "./Header";
import Nav from "./Nav";

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

  return (
    <>
      {!hideNavigation && <Header title="도미톡!" />}
      <div className={`content-container ${hideNavigation ? "!p-0" : ""}`}>
        {children}
      </div>
      {!hideNavigation && <Nav />}
    </>
  );
}

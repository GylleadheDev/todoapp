import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";

type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard = async ({ children }: AuthGuardProps) => {
  const cookieStore = await cookies();
  const user = await verifyAuth(cookieStore);
  if (!user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
};

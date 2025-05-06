"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useAuth(requireAuth = false) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If authentication is required and user is not logged in
    if (requireAuth && !loading && !authenticated) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [requireAuth, loading, authenticated, router, pathname]);

  return {
    session,
    loading,
    authenticated,
    user: session?.user,
    accessToken: session?.accessToken,
    signIn,
    signOut,
  };
} 
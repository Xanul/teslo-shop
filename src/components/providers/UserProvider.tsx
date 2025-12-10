'use client';

import { SessionProvider } from "next-auth/react";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
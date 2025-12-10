'use server';

import { signOut } from "@/config/auth.config";

export const logout = async () => {
  await signOut();
}
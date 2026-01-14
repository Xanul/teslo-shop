"use server";
import { auth } from "@/config/auth.config";
import { UserRole } from "@/interfaces";
import { userService } from "@/services";

export const updateUserRole = async (userId: string, role: UserRole) => {
  const session = await auth();

  if (!session?.user || session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const user = await userService.updateUserRole(userId, role);
    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Error updating user role",
    };
  }
};

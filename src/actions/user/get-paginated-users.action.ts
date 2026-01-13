"use server";
import { auth } from "@/config/auth.config";
import { userService } from "@/services";

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (!session?.user || session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const users = await userService.getAllUsers();
    return {
      ok: true,
      users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error fetching users",
    };
  }
};

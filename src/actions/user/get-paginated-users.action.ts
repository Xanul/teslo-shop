"use server";
import { auth } from "@/config/auth.config";
import { userService } from "@/services";

export const getPaginatedUsers = async (page?: number, take?: number) => {
  const session = await auth();

  if (!session?.user || session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const { currentPage, totalPages, users } = await userService.getAllUsers({
      page,
      take,
    });
    return {
      ok: true,
      currentPage,
      totalPages,
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

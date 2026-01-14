import { UserRole } from "@/interfaces";
import prisma from "@/lib/prisma";

export class UserRepository {
  async findAll(take: number, skip: number) {
    return prisma.user.findMany({
      take,
      skip,
    });
  }

  async updateRole(userId: string, role: UserRole) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });
  }

  // Método para contar todos los usuarios
  async count() {
    return prisma.user.count();
  }
}

import prisma from "@/lib/prisma";

export class UserRepository {
  async findAll(take: number, skip: number) {
    return prisma.user.findMany({
      take,
      skip,
    });
  }

  // Método para contar todos los usuarios
  async count() {
    return prisma.user.count();
  }
}

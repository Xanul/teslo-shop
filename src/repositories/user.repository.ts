import prisma from "@/lib/prisma";

export class UserRepository {
  async findAll() {
    return prisma.user.findMany();
  }
}

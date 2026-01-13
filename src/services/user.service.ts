import { UserRepository } from "@/repositories";
import { validatePaginationParams } from "@/utils";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export class UserService {
  constructor(private repository: UserRepository) {}

  async getAllUsers(options: PaginationOptions) {
    const { page, take } = validatePaginationParams(options.page, options.take);
    const skip = (page - 1) * take;

    try {
      // Obtener usuarios y conteo total en paralelo
      const [users, totalUsers] = await Promise.all([
        this.repository.findAll(take, skip),
        this.repository.count(),
      ]);

      // Retornar resultado con información de paginación
      return {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / take),
        users,
      };
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }
}

const userRepository = new UserRepository();
export const userService = new UserService(userRepository);

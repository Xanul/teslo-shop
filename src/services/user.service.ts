import { UserRepository } from "@/repositories";

export class UserService {
  constructor(private repository: UserRepository) {}

  async getAllUsers() {
    return this.repository.findAll();
  }
}

const userRepository = new UserRepository();
export const userService = new UserService(userRepository);

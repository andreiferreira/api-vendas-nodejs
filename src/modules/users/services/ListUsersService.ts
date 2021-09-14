import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepositories);

    const users = userRepository.find();
    return users;
  }
}
export { ListUserService };

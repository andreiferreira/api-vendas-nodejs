import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IUser {
  id: string;
}
class ShowUserService {
  public async execute({ id }: IUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepositories);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export { ShowUserService };

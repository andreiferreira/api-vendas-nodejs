import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}
class UpdateUserService {
  async execute({ id, name, email, password }: IUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepositories);
    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepository.save(user);
    return user;
  }
}

export { UpdateUserService };

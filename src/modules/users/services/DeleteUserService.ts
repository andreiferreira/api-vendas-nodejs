import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IUser {
  id: string;
}
class DeleteUserService {
  public async execute({ id }: IUser): Promise<void> {
    const userRepository = getCustomRepository(UsersRepositories);

    const user = await userRepository.find({ id });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await userRepository.remove(user);
    return;
  }
}

export { DeleteUserService };

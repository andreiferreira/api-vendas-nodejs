import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IUser {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: IUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepositories);

    const userExists = await userRepository.findOne({ email });

    if (userExists) {
      throw new AppError('User already exists.', 400);
    }

    if (password.length <= 5) {
      throw new AppError('Password too short', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }
}
export { CreateUserService };

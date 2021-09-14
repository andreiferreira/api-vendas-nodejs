import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface ISession {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: ISession): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return token;
  }
}

export { CreateSessionsService };

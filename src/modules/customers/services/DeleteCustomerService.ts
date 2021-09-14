import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  id: string;
}
class DeleteCustomerService {
  public async execute({ id }: ICustomer): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('User not found', 404);
    }

    await customerRepository.remove(customer);
  }
}

export { DeleteCustomerService };

import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  id: string;
}
class ShowCustomerService {
  public async execute({ id }: ICustomer): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('User not found', 404);
    }

    return customer;
  }
}

export { ShowCustomerService };

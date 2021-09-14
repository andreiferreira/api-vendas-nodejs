import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  id: string;
  name: string;
  email: string;
}
class UpdateCustomerService {
  async execute({ id, name, email }: ICustomer): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('User not found.', 404);
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);
    return customer;
  }
}

export { UpdateCustomerService };

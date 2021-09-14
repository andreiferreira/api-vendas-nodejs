import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  name: string;
  email: string;
}
class CreateCustomerService {
  public async execute({ name, email }: ICustomer): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customerExists = await customerRepository.findOne({ email });

    if (customerExists) {
      throw new AppError('User already exists.', 400);
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);
    return customer;
  }
}
export { CreateCustomerService };

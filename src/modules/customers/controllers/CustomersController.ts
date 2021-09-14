import { Request, Response } from 'express';
import { CreateCustomerService } from '../services/CreateCustomerService';
import { DeleteCustomerService } from '../services/DeleteCustomerService';
import { ListCustomersService } from '../services/ListCustomersService';
import { ShowCustomerService } from '../services/ShowCustomerService';
import { UpdateCustomerService } from '../services/UpdateCustomerService';

export class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomersService = new ListCustomersService();

    const customers = await listCustomersService.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = new ShowCustomerService();

    const customer = await showCustomerService.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomerService = new UpdateCustomerService();

    const customer = await updateCustomerService.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute({ id });

    return response.json([]);
  }
}

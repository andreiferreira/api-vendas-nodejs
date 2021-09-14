import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const productRepository = await getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already a product with this name', 400);
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export { CreateProductService };

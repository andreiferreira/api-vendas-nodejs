import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductService {
  async execute({ id, name, price, quantity }: IProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const productExists = await productRepository.findByName(name);

    if (productExists?.id !== product.id) {
      throw new AppError('There is already one product with this name', 400);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);
    return product;
  }
}

export { UpdateProductService };

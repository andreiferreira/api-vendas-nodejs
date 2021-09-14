import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
}
class DeleteProductService {
  public async execute({ id }: IProduct): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not exists.', 404);
    }

    await productRepository.remove(product);

    return;
  }
}

export { DeleteProductService };

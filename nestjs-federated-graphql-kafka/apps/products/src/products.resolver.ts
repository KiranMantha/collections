import { Product } from '@libs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    const products = await this.productsService.findAll();
    return products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
    }));
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
  ): Promise<Product> {
    const product = await this.productsService.create(name, price);
    return {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
    };
  }
}

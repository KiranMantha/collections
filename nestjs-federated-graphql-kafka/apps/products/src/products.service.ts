import { ProductEntity } from '@libs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async create(name: string, price: number): Promise<ProductEntity> {
    const product = this.productRepository.create({ name, price });
    return this.productRepository.save(product);
  }
}

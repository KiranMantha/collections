import { InventoryEntity } from '@libs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async findByProductId(productId: number): Promise<InventoryEntity | null> {
    return this.inventoryRepository.findOne({ where: { productId } });
  }

  async updateStock(
    productId: number,
    stock: number,
  ): Promise<InventoryEntity> {
    const inventory =
      (await this.findByProductId(productId)) ??
      this.inventoryRepository.create({ productId });
    inventory.stock = stock;
    return this.inventoryRepository.save(inventory);
  }
}

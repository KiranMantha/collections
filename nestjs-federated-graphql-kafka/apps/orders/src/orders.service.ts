import { OrderEntity } from '@libs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  async create(productId: number, quantity: number): Promise<OrderEntity> {
    const order = this.orderRepository.create({ productId, quantity });
    return this.orderRepository.save(order);
  }
}

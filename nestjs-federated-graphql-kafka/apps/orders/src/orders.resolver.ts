import { Order } from '@libs/common';
import { KafkaProducer } from '@libs/kafka';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly kafkaProducer: KafkaProducer,
  ) {}

  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    const orders = await this.ordersService.findAll();
    return orders.map((order) => ({
      id: order.id.toString(),
      productId: order.productId.toString(),
      quantity: order.quantity,
    }));
  }

  @Mutation(() => Order)
  async createOrder(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
  ): Promise<Order> {
    const order = await this.ordersService.create(productId, quantity);
    await this.kafkaProducer.emit('order-created', order);
    return {
      id: order.id.toString(),
      productId: order.productId.toString(),
      quantity: order.quantity,
    };
  }
}

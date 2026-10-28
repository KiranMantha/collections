import { Inventory, Order } from '@libs/common';
import { KafkaConsumer } from '@libs/kafka';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly kafkaConsumer: KafkaConsumer,
  ) {}

  async onModuleInit() {
    await this.kafkaConsumer.subscribe(
      'order-created',
      async (order: Order) => {
        const inventory = await this.inventoryService.findByProductId(
          +order.productId,
        );
        if (inventory) {
          await this.inventoryService.updateStock(
            +order.productId,
            inventory.stock - order.quantity,
          );
        } else {
          console.log(`No inventory found for product ID ${order.productId}`);
        }
      },
    );
  }

  @Query(() => Inventory, { nullable: true })
  async inventory(
    @Args('productId') productId: number,
  ): Promise<Inventory | null> {
    const inventory = await this.inventoryService.findByProductId(productId);
    if (!inventory) return null;
    return {
      productId: inventory.productId.toString(),
      stock: inventory.stock,
    };
  }

  @Mutation(() => Inventory)
  async updateStock(
    @Args('productId') productId: number,
    @Args('stock') stock: number,
  ): Promise<Inventory> {
    const updatedInventory = await this.inventoryService.updateStock(
      productId,
      stock,
    );
    return {
      productId: updatedInventory.productId.toString(),
      stock: updatedInventory.stock,
    };
  }
}

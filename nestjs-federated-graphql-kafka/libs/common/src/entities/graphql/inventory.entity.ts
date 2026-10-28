import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "productId")')
export class Inventory {
  @Field(() => ID)
  productId: string;

  @Field()
  stock: number;
}

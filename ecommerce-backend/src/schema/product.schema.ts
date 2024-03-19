import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true, default: 0 })
  rating: number;

  @Prop({ required: true, default: 0 })
  numReviews: number;

  @Prop({ required: true, default: 0 })
  countInStock: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop()
  banner?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

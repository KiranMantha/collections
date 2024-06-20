import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: User, required: true })
  user: User;

  @Prop([
    {
      product: { type: Product, required: true },
      name: { type: String, required: true },
      slug: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ])
  items: {
    product: Product;
    name: string;
    slug: string;
    qty: number;
    image: string;
    price: number;
  }[];

  @Prop({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  })
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({
    id: String,
    status: String,
    email_address: String
  })
  paymentResult: {
    id: string;
    status: string;
    email_address: string;
  };

  @Prop({ required: true })
  itemsPrice: number;

  @Prop({ required: true })
  shippingPrice: number;

  @Prop({ required: true })
  taxPrice: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, default: false })
  isPaid: boolean;

  @Prop({ required: true, default: false })
  isDelivered: boolean;

  @Prop()
  paidAt: Date;

  @Prop()
  deliveredAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

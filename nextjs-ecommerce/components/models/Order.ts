export interface Order {
  _id: string;
  user?: { name: string };
  items: [OrderItem];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: { id: string; status: string; email_address: string };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
}

export interface OrderItem {
  name: string;
  slug: string;
  qty: number;
  image: string;
  price: number;
  color: string;
  size: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

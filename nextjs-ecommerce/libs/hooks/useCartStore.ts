import { OrderItem, ShippingAddress } from '@models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { round2 } from '../utils';

const orderItems: OrderItem[] = [
  {
    name: 'Cotton T-Shirt',
    slug: 'cotton-t-shirt',
    qty: 2,
    image: '/cotton-t-shirt.jpg',
    price: 19.99,
    color: 'white',
    size: 'M'
  },
  {
    name: 'Hooded Sweatshirt',
    slug: 'hooded-sweatshirt',
    qty: 1,
    image: '/hooded-sweatshirt.jpg',
    price: 39.99,
    color: 'black',
    size: 'L'
  },
  {
    name: 'Denim Jeans',
    slug: 'denim-jeans',
    qty: 1,
    image: '/denim-jeans.jpg',
    price: 59.99,
    color: 'blue',
    size: '32'
  },
  {
    name: 'Leather Belt',
    slug: 'leather-belt',
    qty: 3,
    image: '/leather-belt.jpg',
    price: 29.99,
    color: 'brown',
    size: 'S'
  },
  {
    name: 'Running Shoes',
    slug: 'running-shoes',
    qty: 1,
    image: '/running-shoes.jpg',
    price: 79.99,
    color: 'gray',
    size: '9'
  },
  {
    name: 'Sunglasses',
    slug: 'sunglasses',
    qty: 2,
    image: '/sunglasses.jpg',
    price: 49.99,
    color: 'black',
    size: 'one size'
  },
  {
    name: 'Leather Jacket',
    slug: 'leather-jacket',
    qty: 1,
    image: '/leather-jacket.jpg',
    price: 199.99,
    color: 'brown',
    size: 'XL'
  },
  {
    name: 'Baseball Cap',
    slug: 'baseball-cap',
    qty: 4,
    image: '/baseball-cap.jpg',
    price: 14.99,
    color: 'red',
    size: 'one size'
  },
  {
    name: 'Winter Gloves',
    slug: 'winter-gloves',
    qty: 2,
    image: '/winter-gloves.jpg',
    price: 24.99,
    color: 'black',
    size: 'M'
  },
  {
    name: 'Backpack',
    slug: 'backpack',
    qty: 1,
    image: '/backpack.jpg',
    price: 59.99,
    color: 'blue',
    size: 'one size'
  }
];

interface Cart {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
}

const initialState: Cart = {
  items: orderItems,
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: 'PayPal',
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  }
};

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(items.reduce((acc, item) => acc + item.price * item.qty, 0)),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(Number(0.15 * itemsPrice)),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore'
  })
);

export function useCartStore() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentMethod, shippingAddress } = cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    increase: (item: OrderItem) => {
      const exist = items.find(x => x.slug === item.slug);
      const updatedCartItems = exist
        ? items.map(x => (x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x))
        : [...items, { ...item, qty: 1 }];
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find(x => x.slug === item.slug);
      if (!exist) return;
      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x: OrderItem) => x.slug !== item.slug)
          : items.map(x => (item.slug ? { ...exist, qty: exist.qty - 1 } : x));
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      });
    },
    saveShippingAddrress: (shippingAddress: ShippingAddress) => {
      cartStore.setState({
        shippingAddress
      });
    },
    savePaymentMethod: (paymentMethod: string) => {
      cartStore.setState({
        paymentMethod
      });
    },
    clear: () => {
      cartStore.setState({
        items: []
      });
    },
    getItemBySlug: (slug: string) => {
      return items.find(item => item.slug === slug);
    },
    init: () => cartStore.setState(initialState)
  };
}

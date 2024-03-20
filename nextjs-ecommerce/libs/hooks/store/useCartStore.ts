import { Cart, OrderItem, ShippingAddress } from '@models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { round2 } from '../../utils';

const initialState: Cart = {
  items: [],
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
      const exist = items.find(x => x._id === item._id);
      const updatedCartItems = exist
        ? items.map(x => (x._id === item._id ? { ...exist, qty: exist.qty + 1 } : x))
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
      const exist = items.find(x => x._id === item._id);
      if (!exist) return;
      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x: OrderItem) => x._id !== item._id)
          : items.map(x => (item._id ? { ...exist, qty: exist.qty - 1 } : x));
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
    getItemById: (id: string) => {
      return items.find(item => item._id === id);
    },
    init: () => cartStore.setState(initialState)
  };
}

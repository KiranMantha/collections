'use client';

import { useCartStore } from '@hooks';
import { OrderItem } from '@models';
import { useEffect, useState } from 'react';

export function AddToCart({ item }: { item: OrderItem }) {
  const { getItemBySlug, increase, decrease } = useCartStore();
  const [existItem, setExistItem] = useState<OrderItem>();

  const addToCartHandler = () => {
    increase(item);
  };

  useEffect(() => {
    setExistItem(getItemBySlug(item.slug));
  }, [item]);

  return existItem ? (
    <div>
      <button className="btn" type="button" onClick={() => decrease(existItem)}>
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button className="btn btn-primary w-full" type="button" onClick={addToCartHandler}>
      Add to cart
    </button>
  );
}

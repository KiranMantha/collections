'use client';

import { useCartStore } from '@hooks/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Cart() {
  const { items, itemsPrice, increase, decrease } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <>
      <h1 className="py-4 text-2xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go to shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  return (
                    <tr key={item.slug}>
                      <td>
                        <Link href={`/product/${item.slug}`} className="flex items-center">
                          <Image src={item.image} alt={item.name} height={50} width={50} />
                          <span>{item.name}</span>
                        </Link>
                      </td>
                      <td>
                        <button className="btn" type="button" onClick={() => decrease(item)}>
                          -
                        </button>
                        <span className="px-2">{item.qty}</span>
                        <button className="btn" type="button" onClick={() => increase(item)}>
                          +
                        </button>
                      </td>
                      <td>${item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="">
            <div className="card bg-base-300">
              <div className="card-body">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)}): ${itemsPrice}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

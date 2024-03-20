'use client';

import { useGetProductById } from '@hooks/product';
import Image from 'next/image';
import { AddToCart } from '../addToCart';

export function ProductDetails({ id }: { id: string }) {
  const product = useGetProductById(id);

  return product ? (
    <div className="grid md:grid-cols-4 md:gap-3">
      <div className="md:col-span-2">
        <Image
          src={product.image.split(',')[0]}
          alt={product.name}
          height={640}
          width={640}
          sizes="100vw"
          style={{ height: 'auto', width: '100%' }}
        />
      </div>
      <div>
        <ul className="space-y-4">
          <li>
            <p className="text-xl">{product.name}</p>
          </li>
          <li>
            Rating: {product.rating} of {product.numReviews}
          </li>
          <li>{product.brand}</li>
          {product.about || product.description ? (
            <li>
              <div className="divider"></div>
            </li>
          ) : null}
          {product.about ? (
            <li>
              About: <p className="mt-1">{product.about}</p>
            </li>
          ) : null}
          {product.description ? (
            <li>
              Description: <p className="mt-1">{product.description}</p>
            </li>
          ) : null}
        </ul>
      </div>
      <div>
        <div className="card bg-base-300 shadow-xl mt-3 md:mt-0">
          <div className="card-body">
            <div className="mb-2 flex justify-between gap-2">
              <div>Price:</div>
              <div>
                {product.currency} {product.price}
              </div>
            </div>
            <div className="mb-2 flex justify-between gap-2">
              <div>Availability:</div>
              <div>{product.availability}</div>
            </div>
            <div className="card-actions justify-center">
              <AddToCart item={{ ...product, qty: 0 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
}

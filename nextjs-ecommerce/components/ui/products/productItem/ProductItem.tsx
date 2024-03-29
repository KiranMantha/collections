import { Product } from '@models';
import Image from 'next/image';
import Link from 'next/link';

export function ProductItem(product: Product) {
  return (
    <div className="card bg-base-300 shadow-xl mb-4">
      <figure>
        <Link href={`/product/${product._id}`}>
          <Image
            className="object-cover h-64 w-full"
            src={product.image.split(',')[0]}
            alt={product.name}
            height={300}
            width={300}
          />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/product/${product._id}`}>
          <h2 className="card-title font-normal">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-2xl">
            {product.currency} {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

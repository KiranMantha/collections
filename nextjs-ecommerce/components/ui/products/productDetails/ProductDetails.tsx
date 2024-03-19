import { Product } from '@models';
import Image from 'next/image';
import { AddToCart } from '../addToCart';

const product: Product = {
  name: 'Product 1',
  slug: 'product-1',
  image: '/product-1.jpg',
  price: 9.99,
  brand: 'Brand 1',
  description: 'This is product 1',
  category: 'Category 1',
  rating: 4.5,
  numReviews: 10,
  countInStock: 20
};
export function ProductDetails({ productSlug }: { productSlug: string }) {
  return (
    <div className="grid md:grid-cols-4 md:gap-3">
      <div className="md:col-span-2">
        <Image
          src={product.image}
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
            <p className="text-xl">
              {productSlug} {product.name}
            </p>
          </li>
          <li>
            {product.rating} of {product.numReviews}
          </li>
          <li>{product.brand}</li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            Description: <p>{product.description}</p>
          </li>
        </ul>
      </div>
      <div>
        <div className="card bg-base-300 shadow-xl mt-3 md:mt-0">
          <div className="card-body">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
            </div>
            {product.countInStock !== 0 ? (
              <div className="card-actions justify-center">
                <AddToCart item={{ ...product, qty: 0, color: '', size: '' }} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

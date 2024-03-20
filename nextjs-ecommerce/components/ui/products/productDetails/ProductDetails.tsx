import { Product } from '@models';
import Image from 'next/image';
import { AddToCart } from '../addToCart';

const product: Product = {
  name: 'Product 1',
  image: '/product-1.jpg',
  price: 9.99,
  brand: 'Brand 1',
  about: 'about',
  description: 'This is product 1',
  category: 'Category 1',
  subcategory: 'Sub Category 1',
  rating: 4.5,
  numReviews: 10,
  availability: 'available within 3-4days'
};
export function ProductDetails({ id }: { id: string }) {
  return (
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
            <p className="text-xl">
              {id} {product.name}
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
            About: <p>{product.about}</p>
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
  );
}

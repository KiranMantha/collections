import { Product } from '@models';
import { ProductItem } from '../productItem';

export const products: Product[] = [
  {
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
  },
  {
    name: 'Product 2',
    slug: 'product-2',
    image: '/product-2.jpg',
    price: 19.99,
    brand: 'Brand 2',
    description: 'This is product 2',
    category: 'Category 2',
    rating: 3.5,
    numReviews: 5,
    countInStock: 15
  },
  {
    name: 'Product 3',
    slug: 'product-3',
    image: '/product-3.jpg',
    price: 29.99,
    brand: 'Brand 3',
    description: 'This is product 3',
    category: 'Category 3',
    rating: 4.0,
    numReviews: 8,
    countInStock: 25
  },
  {
    name: 'Product 4',
    slug: 'product-4',
    image: '/product-4.jpg',
    price: 39.99,
    brand: 'Brand 4',
    description: 'This is product 4',
    category: 'Category 4',
    rating: 4.8,
    numReviews: 12,
    countInStock: 30
  },
  {
    name: 'Product 5',
    slug: 'product-5',
    image: '/product-5.jpg',
    price: 49.99,
    brand: 'Brand 5',
    description: 'This is product 5',
    category: 'Category 5',
    rating: 3.0,
    numReviews: 3,
    countInStock: 10
  },
  {
    name: 'Product 6',
    slug: 'product-6',
    image: '/product-6.jpg',
    price: 59.99,
    brand: 'Brand 6',
    description: 'This is product 6',
    category: 'Category 6',
    rating: 4.2,
    numReviews: 15,
    countInStock: 18
  },
  {
    name: 'Product 7',
    slug: 'product-7',
    image: '/product-7.jpg',
    price: 69.99,
    brand: 'Brand 7',
    description: 'This is product 7',
    category: 'Category 7',
    rating: 4.9,
    numReviews: 20,
    countInStock: 22
  },
  {
    name: 'Product 8',
    slug: 'product-8',
    image: '/product-8.jpg',
    price: 79.99,
    brand: 'Brand 8',
    description: 'This is product 8',
    category: 'Category 8',
    rating: 3.7,
    numReviews: 7,
    countInStock: 12
  },
  {
    name: 'Product 9',
    slug: 'product-9',
    image: '/product-9.jpg',
    price: 89.99,
    brand: 'Brand 9',
    description: 'This is product 9',
    category: 'Category 9',
    rating: 4.6,
    numReviews: 18,
    countInStock: 28
  },
  {
    name: 'Product 10',
    slug: 'product-10',
    image: '/product-10.jpg',
    price: 99.99,
    brand: 'Brand 10',
    description: 'This is product 10',
    category: 'Category 10',
    rating: 3.9,
    numReviews: 9,
    countInStock: 16
  }
];

export function ProductList() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <ProductItem key={product.slug} {...product} />
      ))}
    </div>
  );
}

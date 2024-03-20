'use client';

import { useGetAllProducts } from '@hooks/product';
import { ProductItem } from '../productItem';

export function ProductList() {
  const products = useGetAllProducts();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <ProductItem key={product._id} {...product} />
      ))}
    </div>
  );
}

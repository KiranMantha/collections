import { Product } from '@models';
import { useEffect, useState } from 'react';

export function useGetAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  }, []);
  return products;
}

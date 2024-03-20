import { Product } from '@models';
import { useEffect, useState } from 'react';

export function useGetAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  }, []);
  return products;
}

export function useGetProductById(id: string) {
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    fetch('/api/products/' + id)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      });
  }, [id]);
  return product;
}

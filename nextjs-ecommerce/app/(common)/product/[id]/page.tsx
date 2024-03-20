'use server';

import { productsService } from '@services/products';
import { ProductDetails } from '@ui';
import Link from 'next/link';

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await productsService.getProductById(id);
  return (
    <>
      <div className="my-2">
        <Link href="/">Back to products</Link>
      </div>
      <ProductDetails product={product} />
    </>
  );
}

import { ProductDetails } from '@ui';
import Link from 'next/link';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <div className="my-2">
        <Link href="/">Back to products</Link>
      </div>
      <ProductDetails id={id.toString()} />
    </>
  );
}

import { Product } from '@models';
import { ProductItem } from '../productItem';

export async function ProductList({ products = [] }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <ProductItem key={product._id} {...product} />
      ))}
    </div>
  );
}

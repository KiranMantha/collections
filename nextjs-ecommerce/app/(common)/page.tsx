import { productsService } from '@services/products';
import { ProductList } from '@ui';

export default async function Home() {
  const products = await productsService.getAllProducts();
  return (
    <>
      <h2 className="text-2xl py-2">Products</h2>
      <ProductList products={products} />
    </>
  );
}

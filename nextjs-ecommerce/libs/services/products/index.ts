import { Product } from '@models';
import { ENDPOINTS, makeRequest } from '../http.service';

const getAllProducts = async (): Promise<Product[]> => {
  const products = await makeRequest({ endpoint: ENDPOINTS.PRODUCTS });
  return products;
};

const getProductById = async (id: string): Promise<Product> => {
  const product = await makeRequest({ endpoint: `${ENDPOINTS.PRODUCTS}/${id}` });
  return product;
};

const productsService = { getAllProducts, getProductById };

export { productsService };

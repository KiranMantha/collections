const ENDPOINTS = {
  PRODUCTS: '/products'
};

const makeRequest = async (endpoint: string) => {
  const url = `${process.env.NEXT_PUBLIC_REST_ENDPOINT}${endpoint}`;
  return await fetch(url).then(res => res.json());
};

export { ENDPOINTS, makeRequest };

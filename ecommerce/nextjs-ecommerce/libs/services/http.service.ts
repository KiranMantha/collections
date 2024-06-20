import { v4 as uuidv4 } from 'uuid';

let sessionId = '';
const ENDPOINTS = {
  PRODUCTS: '/products',
  USER: '/user'
};

const getSessionId = () => {
  // const sessionId = sessionStorage.getItem('session-id');
  if (sessionId) return sessionId;

  const newSessionId = uuidv4();
  // sessionStorage.setItem('session-id', newSessionId);
  sessionId = newSessionId;
  return newSessionId;
};

const makeRequest = async ({
  endpoint,
  method = 'GET',
  payload,
  headers = {}
}: {
  endpoint: string;
  method?: 'GET' | 'POST';
  payload?: Record<string, unknown>;
  headers?: Record<string, string>;
}) => {
  const url = `${process.env.NEXT_PUBLIC_REST_ENDPOINT}${endpoint}`;
  const correlationid = `${getSessionId()}_${Date.now()}`;
  const options: RequestInit = { method };
  options.headers = new Headers({
    'x-correlation-id': correlationid,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers
  });

  if (payload) {
    options.body = JSON.stringify(payload);
  }
  console.log('************************', url, options);
  return await fetch(url, options).then(res => res.json());
};

export { ENDPOINTS, makeRequest };

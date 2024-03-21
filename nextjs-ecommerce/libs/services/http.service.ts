import { v4 as uuidv4 } from 'uuid';

const ENDPOINTS = {
  PRODUCTS: '/products'
};

const getSessionId = () => {
  const sessionId = sessionStorage.getItem('session-id');
  if (sessionId) return sessionId;
  const newSessionId = uuidv4();
  sessionStorage.setItem('session-id', newSessionId);
  return newSessionId;
};

const makeRequest = async (endpoint: string) => {
  const url = `${process.env.NEXT_PUBLIC_REST_ENDPOINT}${endpoint}`;
  const headers = new Headers();
  const correlationid = `${getSessionId()}_${Date.now()}`;
  headers.append('x-correlation-id', correlationid);
  return await fetch(url, { headers }).then(res => res.json());
};

export { ENDPOINTS, makeRequest };

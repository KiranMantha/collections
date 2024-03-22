import { User } from '@models';
import { ENDPOINTS, makeRequest } from '@services/http.service';

const login = async (credentials: Record<'email' | 'password', string>): Promise<User> => {
  const user = await makeRequest({ endpoint: ENDPOINTS.USER + '/login', method: 'POST', payload: { ...credentials } });
  return user;
};

const userService = { login };

export { userService };

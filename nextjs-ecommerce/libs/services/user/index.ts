import { User } from '@models';
import { ENDPOINTS, makeRequest } from '@services/http.service';

const login = async (
  credentials: Record<'email' | 'password', string>
): Promise<{ token: string; refreshToken: string }> => {
  const user = await makeRequest({ endpoint: ENDPOINTS.USER + '/login', method: 'POST', payload: { ...credentials } });
  return user;
};

const refreshToken = async (
  token: string
): Promise<{
  token: string;
  refreshToken: string;
}> => {
  const response = await makeRequest({
    endpoint: ENDPOINTS.USER + '/refresh',
    method: 'POST',
    headers: {
      authorization: `Refresh ${token}`
    }
  });
  return response;
};

const register = async (newUser: { name: string; email: string; password: string }): Promise<User> => {
  const user = await makeRequest({
    endpoint: ENDPOINTS.USER + '/register',
    method: 'POST',
    payload: { ...newUser }
  });
  return user;
};

const userService = { login, register, refreshToken };

export { userService };

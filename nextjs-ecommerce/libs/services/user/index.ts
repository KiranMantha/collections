import { User } from '@models';
import { ENDPOINTS, makeRequest } from '@services/http.service';

const findUser = async (email: string): Promise<User> => {
  const user = await makeRequest({ endpoint: ENDPOINTS.USER, method: 'POST', payload: { email } });
  return user;
};

const userService = { findUser };

export { userService };

import axios from "axios";

const AUTH_TOKEN_KEY = "authToken";

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
export const setAuthToken = (token) => localStorage.setItem(AUTH_TOKEN_KEY, token);
export const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// One place that attaches the token, so every verb is authenticated the same
// way. The server expects `x-auth-token: Bearer <jwt>`.
client.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers["x-auth-token"] = `Bearer ${token}`;
  return config;
});

class APIClient {
  /**
   * Fetch, optionally with query params
   */
  get = (path, params) => client.get(path, { params });

  /**
   * post given data to url
   */
  create = (path, data) => client.post(path, data);

  /**
   * Updates data
   */
  update = (path, data) => client.patch(path, data);

  /**
   * Delete
   */
  delete = (path, config) => client.delete(path, { ...config });
}

export { APIClient, client };

import axios from 'axios';
// const url = import.meta.env.API_URL;
export const instance = axios.create({
  // baseURL: 'https://ecommerce-11vj.onrender.com/v1/admin',
  baseURL: 'http://localhost:3000/v1/admin',
});

const getToken = () => {
  return localStorage.getItem('token');
};
instance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

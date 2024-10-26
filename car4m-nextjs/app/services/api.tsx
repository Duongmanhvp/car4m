import axios, { AxiosInstance } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);// import axios from 'axios';


instance.interceptors.response.use(
  (config) => {
    return config.data
  },
  (error) => Promise.reject(error)
)

export default instance
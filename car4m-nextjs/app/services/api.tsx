import axios, { AxiosInstance } from 'axios';
import qs from 'qs'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => {
    // Sử dụng `qs.stringify` với `encode: false` để giữ nguyên chuỗi mà không bị decode
    return qs.stringify(params, { encode: false });
  },
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
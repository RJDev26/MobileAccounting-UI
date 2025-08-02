import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://apimobile.saralaccount.com',
});

export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://apimobile.saralaccount.com'
})

export default axiosInstance
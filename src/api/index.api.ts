import axios from "axios";

const API_URL = "http://192.168.28.150:8080";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/ld+json",
  },
});

export const healthCheck = async () => axios.get(`${API_URL}/health-check`);

const updateAxiosInstanceWithToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export {axiosInstance, updateAxiosInstanceWithToken};
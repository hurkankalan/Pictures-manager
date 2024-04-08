import axios from "axios";

export const API_URL = "http://10.22.255.200:8080";

const axiosInstance = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        "Content-Type": "application/ld+json",
    },
});

export const axiosFiles = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const checkHealth = async () => axios.get(`${API_URL}/health-check`);

const updateAxiosInstanceWithToken = (token:string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export { axiosInstance, updateAxiosInstanceWithToken };
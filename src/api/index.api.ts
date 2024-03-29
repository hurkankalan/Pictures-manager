import axios from "axios";

const AUTH_TOKEN = "";

export const API_URL = "http://localhost:8080";

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

axiosInstance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
//axiosInstance.defaults.timeout = 3000;

export default axiosInstance;

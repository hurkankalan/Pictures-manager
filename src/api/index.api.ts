import axios from "axios";

const AUTH_TOKEN = "";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosFiles = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

axiosInstance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axiosInstance.defaults.timeout = 3000;

export default axiosInstance;

import axios from "axios";

// const AUTH_TOKEN = "myFakeToken";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer" + AUTH_TOKEN;
// axiosInstance.defaults.timeout = 10000;

export default axiosInstance;

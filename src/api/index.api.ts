import axios from "axios";

// const AUTH_TOKEN = "myFakeToken";

const axiosInstance = axios.create({
  baseURL: "http://10.22.255.200:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer" + AUTH_TOKEN;
// axiosInstance.defaults.timeout = 10000;

export default axiosInstance;

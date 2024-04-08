import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.140.56:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

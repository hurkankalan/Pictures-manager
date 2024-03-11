import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const AUTH_TOKEN = "";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axiosInstance.defaults.timeout = 3000;

export default axiosInstance;

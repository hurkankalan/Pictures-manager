import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.138.222:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
const updateAxiosInstanceWithToken = (token:string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export { axiosInstance, updateAxiosInstanceWithToken };
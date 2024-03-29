import axiosInstance from "./index.api";

export const register = async (email: string, password: string) => {
  const response = await axiosInstance.post("/register", {
    email,
    password,
  });

  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/login", {
    email,
    password,
  });

  return response.data;
};

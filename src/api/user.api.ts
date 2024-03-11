import axiosInstance from "./index.api";

export const registerUser = async (email: string, password: string) => {
  const response = await axiosInstance.post("/register", {
    email,
    password,
  });

  return response.data;
};

import axiosInstance from "./index.api";

export const register = async (email: string, password: string) => {
  const response = await axiosInstance.post("/register", {
    email,
    password,
  });

  console.log(response);

  return response.data;
};
export const changeUserPassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const response = await axiosInstance.post("/password", {
    email,
    oldPassword,
    newPassword,
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

import {axiosInstance} from "./index.api";

export const register = async (email: string, password: string) => {
    const response = await axiosInstance.post("/register", {
        email,
        password,
    });
    return response.data;
};

export const changeUserPassword = async (
    oldPassword: string,
    newPassword: string
) => {
    try {
        const response = await axiosInstance.put("/password", {
            oldPassword,
            newPassword
        });
        alert("Password Changed")
        return response.data;
    } catch (error: any) {
        if (error=="AxiosError: Request failed with status code 400"){
            alert("Wrong password")
        }
        console.log("There is an error", error)
    }


};

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post("/login_check", {
        email,
        password
    });
    return response.data;
};

import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeUserPassword } from "../../api/user.api";
import { ChangePassword } from "../../types/User";

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async ({ email, oldPassword, newPassword }: ChangePassword, { rejectWithValue }) => {
        try {
            const response = await changeUserPassword(email, oldPassword, newPassword);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

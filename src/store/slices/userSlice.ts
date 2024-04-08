import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeUserPassword } from "../../api/user.api";
import { ChangePassword } from "../../types/User";

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async ({ oldPassword, newPassword }: ChangePassword, { rejectWithValue }) => {
        try {
            const response = await changeUserPassword(oldPassword, newPassword);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PhotoUpdatePayload, updatePhoto} from "../../api/photo.api";

interface PhotoState {
    selectedPhoto: number[],
    loading: boolean,
    success: boolean,
    error: string | null,
}

const initialState: PhotoState = {
    selectedPhoto: [],
    loading: false,
    success: false,
    error: null,
};

export const updatePhotoAsync = createAsyncThunk(
    'photo/updatePhoto',
    async (payload: {photoId: number, payload: PhotoUpdatePayload}) => {
        return await updatePhoto(payload.photoId, payload.payload);
    }
);

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        setSelectPhoto: (state, action: PayloadAction<number>) => {
            state.selectedPhoto.push(action.payload);
        },
        clearSelectPhoto: (state) => {
            state.selectedPhoto = [];
        },
    }
});

export const { setSelectPhoto, clearSelectPhoto } = photoSlice.actions;

export default photoSlice.reducer;
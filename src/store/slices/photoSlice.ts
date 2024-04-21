import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PhotoUpdatePayload, updatePhoto, deletePhoto, listPhotosByAlbumId} from "../../api/photo.api";

interface PhotoState {
    photoList: any,
    selectedPhoto: number[],
    loading: boolean,
    success: boolean,
    error: string | null,
    deleteSuccess: boolean,
}

const initialState: PhotoState = {
    photoList: [],
    selectedPhoto: [],
    loading: false,
    success: false,
    error: null,
    deleteSuccess: false,
};

export const listPhotosByAlbumIdAsync = createAsyncThunk(
    'photo/listPhotosByAlbumId',
    async (albumId: number) => {
        const response = await listPhotosByAlbumId(albumId);
        return response.photos;
    }
);

export const updatePhotoAsync = createAsyncThunk(
    'photo/updatePhoto',
    async (payload: {photoId: number, payload: PhotoUpdatePayload}) => {
        return await updatePhoto(payload.photoId, payload.payload);
    }
);

export const deletePhotoAsync = createAsyncThunk(
    'photo/deletePhoto',
    async (photoId: number) => {
        return await deletePhoto(photoId);
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
    },
    extraReducers: (builder) => {
        builder.addCase(listPhotosByAlbumIdAsync.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(listPhotosByAlbumIdAsync.fulfilled, (state, {payload}) => {
            state.photoList = payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(listPhotosByAlbumIdAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload as string | null;
        });

        builder.addCase(deletePhotoAsync.pending, (state) => {
            state.loading = true;
            state.deleteSuccess = false;
            state.error = null;
        });
        builder.addCase(deletePhotoAsync.fulfilled, (state, {payload}) => {
            state.photoList = state.photoList.filter((photo: any) => photo.id !== payload);
            state.loading = false;
            state.deleteSuccess = true;
            state.error = null;
        });
        builder.addCase(deletePhotoAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.deleteSuccess = false;
            state.error = payload as string | null;
        });
    }
});

export const { setSelectPhoto, clearSelectPhoto } = photoSlice.actions;

export default photoSlice.reducer;
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { getAlbumsByUserId, createAlbum, deleteAlbumById } from "../../api/album.api";

interface AlbumState {
    albumList: any,
    selectedAlbum: number[],
    isAddModalVisible: boolean,
    isUpdateModalVisible: boolean,
    isShareModalVisible: boolean,
    isRemoveModalVisible: boolean,
    loading: boolean,
    success: boolean,
    error: string | null,
}

const initialState: AlbumState = {
    albumList: [],
    selectedAlbum: [],
    isAddModalVisible: false,
    isUpdateModalVisible: false,
    isShareModalVisible: false,
    isRemoveModalVisible: false,
    loading: false,
    success: false,
    error: null,
};

export const getAlbums = createAsyncThunk(
    'album/getAlbums',
    async (userId: number) => {
        return await getAlbumsByUserId(userId);
    }
);

export const createAlbumAsync = createAsyncThunk(
    'album/createAlbum',
    async (name: string) => {
        return await createAlbum(name);
    }
);

export const deleteAlbumAsync = createAsyncThunk(
    'album/deleteAlbum',
    async (albumIds: number[]) => {
        return await deleteAlbumById(albumIds);
    }
);

export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAlbumList: (state, action: PayloadAction<any>) => {
            state.albumList = action.payload;
        },
        setSelectAlbum: (state, action: PayloadAction<number>) => {
            state.selectedAlbum.push(action.payload);
        },
        clearSelectAlbum: (state) => {
            state.selectedAlbum = [];
        },
        removeSelectAlbum: (state, action: PayloadAction<number>) => {
            state.selectedAlbum = state.selectedAlbum.filter(id => id !== action.payload);
        },
        setAddModalVisible: (state, action: PayloadAction<boolean>) => {
            state.isAddModalVisible = action.payload;
        },
        setUpdateModalVisible: (state, action: PayloadAction<boolean>) => {
            state.isUpdateModalVisible = action.payload;
        },
        setShareModalVisible: (state, action: PayloadAction<boolean>) => {
            state.isShareModalVisible = action.payload;
        },
        setRemoveModalVisible: (state, action: PayloadAction<boolean>) => {
            state.isRemoveModalVisible = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAlbums.pending, (state) => {
            state.albumList = [];
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(getAlbums.fulfilled, (state, { payload }) => {
            console.log('payload : ' + payload);
            state.albumList = payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(getAlbums.rejected, (state, { payload }) => {
            state.albumList = [];
            state.loading = false;
            state.success = false;
            state.error =  payload as string | null;
        });
        builder.addCase(createAlbumAsync.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(createAlbumAsync.fulfilled, (state, { payload }) => {
            state.albumList = [...state.albumList, payload];
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(createAlbumAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.success = false;
            state.error = payload as string | null;
        });
        builder.addCase(deleteAlbumAsync.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(deleteAlbumAsync.fulfilled, (state, { payload }) => {
            state.albumList = state.albumList.filter((album: any) => !payload.includes(album.id));
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(deleteAlbumAsync.rejected, (state, { payload }) => {
            state.loading = false;
            state.success = false;
            state.error = payload as string | null;
        });
    }
});

export const {
    setAlbumList,
    setSelectAlbum,
    removeSelectAlbum,
    clearSelectAlbum,
    setAddModalVisible,
    setUpdateModalVisible,
    setShareModalVisible,
    setRemoveModalVisible,
} = albumSlice.actions;
export default albumSlice.reducer;

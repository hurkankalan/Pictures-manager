import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAlbumsByUserId, createAlbum, deleteAlbumById, updateAlbums, shareAlbums} from "../../api/album.api";
import {AlbumSharing, Album, UpdateAlbum} from "../../types/Albums";

function getError(caught: any) {
    return caught?.response?.data?.reason || caught?.response?.data?.errors?.join('\n') || 'Unknown';
}

interface AlbumState {
    albumList: any,
    id: number | null,
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
    id: null,
    selectedAlbum: [],
    isAddModalVisible: false,
    isUpdateModalVisible: false,
    isShareModalVisible: false,
    isRemoveModalVisible: false,
    loading: false,
    success: false,
    error: null,
};
const ERROR_MESSAGE = 'Server returned an empty response';

export const getAlbums = createAsyncThunk(
    'album/getAlbums',
    async (userId: number | string) => {
        return await getAlbumsByUserId(userId);
    }
);

export const createAlbumAsync = createAsyncThunk(
    'album/createAlbum',
    async (name: string) => {
        return await createAlbum(name);
    }
);

export const updateAlbumAsync = createAsyncThunk(
    'album/updateAlbum',
    async ({name, albumId}: UpdateAlbum, {rejectWithValue}) => {
        try {
            if (!name || !albumId) {
                const errorMessage = 'Error in the name or albumId';
                return rejectWithValue(errorMessage);
            }
            const response = await updateAlbums(name, albumId);
            if (Array.isArray(response) && response.length === 0) {
                alert(ERROR_MESSAGE);
                return rejectWithValue(ERROR_MESSAGE);
            }
            return response;
        } catch (caught: any) {
            const error = getError(caught);
            console.error(error);
            alert(error);
            return rejectWithValue(error);
        }
    }
);
export const shareAlbumAsync = createAsyncThunk(
    'album/shareAlbum',
    async ({email = null, emailDel = null, albumId}: AlbumSharing, {rejectWithValue}) => {
        try {
            console.log(email, emailDel, albumId)
            const response = await shareAlbums(email, emailDel, albumId);
            if (Array.isArray(response) && response.length === 0) {
                alert(ERROR_MESSAGE);
                return rejectWithValue(ERROR_MESSAGE);
            }
            return response;
        } catch (caught: any) {
            const error = getError(caught);
            console.error(error);
            alert(error);
            return rejectWithValue(error);
        }
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
        builder.addCase(getAlbums.fulfilled, (state, {payload}) => {
            console.log('payload : ' + payload);
            state.albumList = payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(getAlbums.rejected, (state, {payload}) => {
            state.albumList = [];
            state.loading = false;
            state.success = false;
            state.error = payload as string | null;
        });
        builder.addCase(createAlbumAsync.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(createAlbumAsync.fulfilled, (state, {payload}) => {
            state.albumList = [...state.albumList, payload];
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(createAlbumAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload as string | null;
        });
        builder.addCase(shareAlbumAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(shareAlbumAsync.fulfilled, (state, {payload}) => {
            state.albumList = state.albumList.map((album: Album) => {
                if (album.id === payload.id) {
                    console.log(album)
                    return {...album, shared_to: Array.isArray(payload.shared_to) ? payload.shared_to : []};
                }
                return album;
            });
            state.loading = false;
            state.success = true;
        });
        builder.addCase(shareAlbumAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload as string | null;
        });
        builder.addCase(updateAlbumAsync.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(updateAlbumAsync.fulfilled, (state, {payload}) => {
            const updatedAlbum = payload;
            const updatedAlbumIndex = state.albumList.findIndex((album: any) => album.id === updatedAlbum.id);
            if (updatedAlbumIndex !== -1) {
                state.albumList[updatedAlbumIndex] = updatedAlbum;
            }
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(updateAlbumAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload as string | null;
        });
        builder.addCase(deleteAlbumAsync.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(deleteAlbumAsync.fulfilled, (state, {payload}) => {
            state.albumList = state.albumList.filter((album: any) => !payload.includes(album.id));
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(deleteAlbumAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload as string | null;
        });
    }
});

export const {
    setSelectAlbum,
    removeSelectAlbum,
    clearSelectAlbum,
    setAddModalVisible,
    setUpdateModalVisible,
    setShareModalVisible,
    setRemoveModalVisible,
} = albumSlice.actions;
export default albumSlice.reducer;

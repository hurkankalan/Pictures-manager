import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAlbumsByUserId } from "../../api/album.api";

interface AlbumState {
    albumList: any,
    selectedAlbum: number[],
    isAddModalVisible: boolean,
    isUpdateModalVisible: boolean,
    isShareModalVisible: boolean,
    isRemoveModalVisible: boolean,
}

const initialState: AlbumState = {
    albumList: getAlbumsByUserId(3),
    selectedAlbum: [],
    isAddModalVisible: false,
    isUpdateModalVisible: false,
    isShareModalVisible: false,
    isRemoveModalVisible: false,
};

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

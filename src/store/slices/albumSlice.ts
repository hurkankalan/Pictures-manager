import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlbumState {
    selectedAlbum: number[],
    isAddModalVisible: boolean,
    isUpdateModalVisible: boolean,
    isShareModalVisible: boolean,
    isRemoveModalVisible: boolean,
}

const initialState: AlbumState = {
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
    setSelectAlbum,
    removeSelectAlbum,
    clearSelectAlbum,
    setAddModalVisible,
    setUpdateModalVisible,
    setShareModalVisible,
    setRemoveModalVisible,
} = albumSlice.actions;
export default albumSlice.reducer;

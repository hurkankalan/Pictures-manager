import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlbumState {
    selectedAlbum: number[],
}

const initialState: AlbumState = {
    selectedAlbum: [],
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
        }
    },
});

export const { setSelectAlbum, removeSelectAlbum, clearSelectAlbum } = albumSlice.actions;
export default albumSlice.reducer;

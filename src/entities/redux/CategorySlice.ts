import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Title } from '../../shared/types/UpdateA';

type initial = {
    cate: Title[];
};
const initialState: initial = {
    cate: [],
};
const storageForCateGory = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addToStorage: (state, action: PayloadAction<Title[]>) => {
            const newCate = action.payload.filter(
                n => !state.cate.some(list => list.id === n.id)
            );
            state.cate = [...state.cate, ...newCate];
        },
        delateStorage: (state, action: PayloadAction<[]>) => {
            state.cate = action.payload;
        },
    },
});
export const { addToStorage, delateStorage } = storageForCateGory.actions;
export default storageForCateGory.reducer;

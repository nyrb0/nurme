import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Title } from "../../types/UpdateA";
interface titlesI {
    update:Title[]
}

const initialState:titlesI = {
    update:[]
}
const updateDataSlice = createSlice({
    name:'updateAnime', 
    initialState,
    reducers:{
        toUpDates:(state,action:PayloadAction<Title>)=>{
            state.update.push(action.payload)
        }
    },
}) 
export const {} = updateDataSlice.actions
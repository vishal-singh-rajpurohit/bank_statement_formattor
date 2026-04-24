import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initializeTraceState } from "next/dist/trace";

interface initialInterfaceTypes{
    price: number
}

const initialState: initialInterfaceTypes = {
    price: 10
}

function changePriceFunc(state: initialInterfaceTypes, actions: PayloadAction<{price: number}>){
    state.price = actions.payload.price
}


export const tempSlice = createSlice({
    name: 'temp',
    initialState: initialState,
    reducers: {
        changePrice: changePriceFunc
    }
})


export const {changePrice} = tempSlice.actions

export default tempSlice.reducer
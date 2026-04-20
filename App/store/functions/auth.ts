import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes{
    full_name: string;
    email: string;
    is_premium_user: boolean;
    creadits: number;
    is_verified: boolean;
}

const initialState: initialStateTypes = {
    email: "",
    full_name: "",
    is_premium_user: false,
    creadits: 0,
    is_verified: false
}


function enterAppFunc(state: initialStateTypes, action: PayloadAction<{data: initialStateTypes}>){
    state.full_name = action.payload.data.full_name;
    state.email = action.payload.data.email;
    state.is_verified = action.payload.data.is_verified;
    state.is_premium_user = action.payload.data.is_premium_user;
    state.creadits = action.payload.data.creadits;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        enterApp: enterAppFunc
    }
});

export const { enterApp } = authSlice.actions;
export default authSlice.reducer;
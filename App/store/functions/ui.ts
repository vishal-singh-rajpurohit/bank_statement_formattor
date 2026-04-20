import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes{
    openProfile: boolean;
    toastOpen: boolean;
    toastType: "success" | "error";
    toastMessage: string;
}

const initializeTraceState: initialStateTypes = {
    openProfile: false,
    toastOpen: false,
    toastType: "success",
    toastMessage: ""
}


function toggleProfileFunc(state: initialStateTypes){
    state.openProfile = !state.openProfile;
}

function toggleToastOpenFunc(state: initialStateTypes, actions: PayloadAction<{data: {toastOpen: boolean; toastType: "success" | "error"; toastMessage: string;}}>){
    state.toastOpen = actions.payload.data.toastOpen;
    state.toastMessage = actions.payload.data.toastMessage;
    state.toastType = actions.payload.data.toastType;
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initializeTraceState,
    reducers: {
        toggleProfile: toggleProfileFunc,
        toggleToastOpen: toggleToastOpenFunc
    }
})

export const {toggleProfile, toggleToastOpen} = uiSlice.actions;
export default uiSlice.reducer;
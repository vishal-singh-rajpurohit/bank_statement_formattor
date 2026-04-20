import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes{
    openProfile: boolean
}

const initializeTraceState: initialStateTypes = {
    openProfile: false
}


function toggleProfileFunc(state: initialStateTypes){
    state.openProfile = !state.openProfile;
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initializeTraceState,
    reducers: {
        toggleProfile: toggleProfileFunc,
    }
})

export const {toggleProfile} = uiSlice.actions;
export default uiSlice.reducer;
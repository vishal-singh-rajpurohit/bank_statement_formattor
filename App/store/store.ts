import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./functions/auth";
import uiSlice from "./functions/ui";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        ui: uiSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
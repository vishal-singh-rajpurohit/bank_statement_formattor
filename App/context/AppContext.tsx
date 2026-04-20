'use client'
import api from "@/config/api_axios";
import { enterApp } from "@/store/functions/auth";
import { useAppDispatch } from "@/store/Hooks";
import { Api_Login_Types } from "@/types/api_resp";
import { AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect } from "react";


interface AppProviderTypes {

}

export const AppProvider = createContext<AppProviderTypes | null>(null);

export function AppContext({ children }: Readonly<{
    children: ReactNode;
}>) {
    const disp = useAppDispatch()

    useEffect(() => {
        (
            async () => {
                try {
                    const resp: AxiosResponse<Api_Login_Types> = await api.get('/auth/', {
                        withCredentials: true
                    })

                    disp(enterApp({
                        data: {
                            full_name: resp.data.name,
                            email: resp.data.email,
                            is_verified: resp.data.is_verified,
                            is_premium_user: resp.data.is_permium_user,
                            creadits: resp.data.credits_token
                        }
                    }))
                } catch (e) {
                    console.log('error is E: ', e)
                }
            }
        )()

    }, [disp])

    const data = {};

    return <AppProvider.Provider value={data} >{children}</AppProvider.Provider>
}
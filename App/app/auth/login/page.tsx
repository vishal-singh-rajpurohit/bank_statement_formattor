'use client'
import React from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { LoginFormErrors, LoginFormValues, loginSchema } from "@/types/auth_inputs"
import { LoginInput } from "@/components/ui/Inputs"
import api from '@/config/api_axios'
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import { Api_Login_Types } from "@/types/api_resp";
import { useAppDispatch } from "@/store/Hooks";
import { enterApp } from "@/store/functions/auth"
import { toggleToastOpen } from "@/store/functions/ui";


export default function LoginPage() {

    const nav = useRouter()
    const disp = useAppDispatch()

    const [formData, setFormData] = React.useState<LoginFormValues>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = React.useState<LoginFormErrors>({});
    const [showPassword, setShowPassword] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: LoginFormErrors = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof LoginFormValues;
                if (!fieldErrors[key]) fieldErrors[key] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            const resp: AxiosResponse<Api_Login_Types> = await api.post('/auth/login', result.data, {
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

            disp(toggleToastOpen({
                data: {
                    toastMessage: 'Login Successfully',
                    toastOpen: true,
                    toastType: "success"
                }
            }))

            if (resp.data.is_verified) nav.replace('/')
            else nav.replace('/auth/verify')

        } catch (e) {
            disp(toggleToastOpen({
                data: {
                    toastMessage: 'Unable to Login',
                    toastOpen: true,
                    toastType: "error"
                }
            }))
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Login
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                    Enter your credentials to continue
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5 flex flex-col gap-2">
                    <LoginInput
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="Enter your email"
                        error={errors.email}
                        onChange={handleChange}
                        icon={<Mail className="h-5 w-5" />}
                    />

                    <LoginInput

                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        placeholder="Enter your password"
                        error={errors.password}
                        onChange={handleChange}
                        icon={<LockKeyhole className="h-5 w-5" />}
                        rightSlot={
                            <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="p-2 text-slate-500"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        }
                    />

                    <button
                        type="submit"
                        className="h-10 flex gap-1 items-center text-center justify-center cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-violet-600 py-3.5 text-white font-semibold shadow-md transition hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}

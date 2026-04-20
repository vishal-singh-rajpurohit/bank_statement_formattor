'use client';
import React, { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react';

import { RegisterInput } from "@/components/ui/Inputs"
import { RegisterFormValues, RegisterFormErrors, registerSchema } from "@/types/auth_inputs"
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/Hooks';
import { Api_Login_Types } from '@/types/api_resp';
import { enterApp } from '@/store/functions/auth';
import api from '@/config/api_axios';




export default function RegisterPage() {
    const nav = useRouter()
    const disp = useAppDispatch()

    const [formData, setFormData] = useState<RegisterFormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const key = name as keyof RegisterFormValues;

        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const result = registerSchema.safeParse(formData);

            if (!result.success) {
                const fieldErrors: RegisterFormErrors = {};

                result.error.issues.forEach((issue) => {
                    const key = issue.path[0] as keyof RegisterFormValues;
                    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
                });

                setErrors(fieldErrors);
                return;
            }

            setErrors({});


            try {
                const resp: AxiosResponse<Api_Login_Types> = await api.post('/auth/', result.data, {
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

                if (resp.data.is_verified) nav.replace('/')
                else nav.replace('/auth/verify')

            } catch (e) {
                console.log('error is E: ', e)
            }
        },
        [formData]
    );

    return (
        <main className="min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-6">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl items-center justify-center">
                <section className="w-full rounded-4xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="mb-8">
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            Create your account
                        </h1>

                        <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                            Enter your information below to get started. It only takes a minute.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 flex flex-col gap-2" noValidate>
                        <RegisterInput
                            label="Full name"
                            name="name"
                            type="text"
                            value={formData.name}
                            placeholder="John Doe"
                            autoComplete="name"
                            error={errors.name}
                            onChange={handleChange}
                            icon={<User className="h-5 w-5" />}
                        />

                        <RegisterInput
                            label="Email address"
                            name="email"
                            type="email"
                            value={formData.email}
                            placeholder="you@example.com"
                            autoComplete="email"
                            error={errors.email}
                            onChange={handleChange}
                            icon={<Mail className="h-5 w-5" />}
                        />

                        <RegisterInput
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            error={errors.password}
                            onChange={handleChange}
                            icon={<LockKeyhole className="h-5 w-5" />}
                            rightSlot={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            }
                        />

                        <RegisterInput
                            label="Confirm password"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            placeholder="Repeat your password"
                            autoComplete="new-password"
                            error={errors.confirmPassword}
                            onChange={handleChange}
                            icon={<LockKeyhole className="h-5 w-5" />}
                            rightSlot={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            }
                        />

                        <button
                            type="submit"
                            className="w-full h-10 flex gap-1 items-center text-center justify-center cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-violet-600 py-3.5 text-white font-semibold shadow-md transition hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                        >
                            Create account
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        <p className="pt-2 text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <button type="button" className="font-medium text-slate-900 hover:underline">
                                Sign in
                            </button>
                        </p>
                    </form>
                </section>
            </div>
        </main>
    );
}
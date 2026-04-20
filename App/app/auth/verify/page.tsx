"use client"
import api from "@/config/api_axios";
import { enterApp } from "@/store/functions/auth";
import { useAppDispatch } from "@/store/Hooks";
import { Api_Login_Types } from "@/types/api_resp";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function OTPVerificationPage() {
  const nav = useRouter()
  const disp = useAppDispatch()

  const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      alert("Enter complete OTP");
      return;
    }

    try {
      const resp: AxiosResponse<Api_Login_Types> = await api.post('/auth/verify-account', {
        otp: finalOtp
      }, {
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

    } catch (e) {
      console.log('error is E: ', e)
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">OTP Verification</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter the 6-digit code sent to your email
        </p>


        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputsRef.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-linear-to-r from-blue-600 to-violet-600 py-3 text-white font-semibold transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Verify OTP
          </button>

        </form>
      </div>
    </main>
  );
}

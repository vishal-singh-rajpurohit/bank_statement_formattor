import {LoginFormValues, RegisterFormValues} from "@/types/auth_inputs"

interface inputFieldType{
    type: string;
    name: keyof LoginFormValues;
    value: string;
    placeholder: string;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    rightSlot?: React.ReactNode;
}

export function LoginInput({type, name, value, placeholder, error, onChange, icon, rightSlot}: inputFieldType) {
    return (
        <div className="w-full">
            <div
                className={`flex items-center gap-3 rounded-2xl border px-4 bg-white w-full ${error
                    ? "border-red-300 ring-4 ring-red-100"
                    : "border-slate-200 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100"
                    }`}
            >
                <div className="text-slate-400 shrink-0">{icon}</div>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    style={{ outline: 'none' }}
                    className="flex-1 min-w-0 py-4 bg-transparent outline-none text-sm sm:text-base"
                />
                {rightSlot}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}

export type RegisterInputProps = {
    label: string;
    type: string;
    name: keyof RegisterFormValues;
    value: string;
    placeholder: string;
    autoComplete?: string;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    rightSlot?: React.ReactNode;
};

export function RegisterInput({
    label,
    type,
    name,
    value,
    placeholder,
    autoComplete,
    error,
    onChange,
    icon,
    rightSlot,
}: RegisterInputProps) {
    return (
        <div className="space-y-2.5">
            <div
                className={`flex items-center gap-3 rounded-2xl border px-4 transition-all duration-200 ${error
                        ? 'border-red-300 bg-red-50'
                        : 'border-slate-200 bg-slate-50/80 focus-within:border-slate-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(148,163,184,0.10)]'
                    }`}
            >
                <span className="shrink-0 text-slate-400">{icon}</span>

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    style={{ outline: 'none' }}
                    className="w-full bg-transparent py-4 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                />

                {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
    );
}
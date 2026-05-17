import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
    label: string;
    type?: "text" | "email" | "password";
    placeholder: string;
    error?: string;
    registration?: UseFormRegisterReturn;
};

export function InputField({
    label,
    type = "text",
    placeholder,
    error,
    registration,
}: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className="flex flex-col">
            <label className="text-text mb-1 text-base font-normal">
                {label}
            </label>

            <div className="relative">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    {...registration}
                    className={`text-text placeholder:text-label h-10 w-full rounded-lg border px-4 text-sm outline-none ${
                        error
                            ? "border-input-error-border"
                            : "border-input-border"
                    } ${error ? "bg-input-error-bg" : "bg-input-bg"}`}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="text-input-border absolute top-1/2 right-4 flex -translate-y-1/2 cursor-pointer items-center transition hover:brightness-110"
                        aria-label={
                            showPassword ? "Esconder senha" : "Mostrar senha"
                        }
                    >
                        <span className="material-icons text-2xl!">
                            {showPassword ? "visibility" : "visibility_off"}
                        </span>
                    </button>
                )}
            </div>

            <span className="text-input-error-border min-h-4 text-xs">
                {error}
            </span>
        </div>
    );
}

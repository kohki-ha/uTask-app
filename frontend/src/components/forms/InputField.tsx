import { useState } from "react";

type InputFieldProps = {
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  error?: string;
};

export function InputField({
  label,
  type = "text",
  placeholder,
  error,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-text text-base font-normal">{label}</label>

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className={`bg-input-bg text-text placeholder:text-label h-10 w-full rounded-lg border px-4 text-sm outline-none ${
            error ? "border-input-error-border" : "border-input-border"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="text-input-border absolute top-1/2 right-4 flex -translate-y-1/2 items-center"
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            <span className="material-icons text-3xl">
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </button>
        )}
      </div>

      {error && (
        <span className="text-input-error-border text-sm">{error}</span>
      )}
    </div>
  );
}

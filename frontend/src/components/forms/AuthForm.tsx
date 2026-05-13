import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "./InputField";
import {
    loginSchema,
    registerSchema,
    type LoginFormData,
    type RegisterFormData,
} from "../../schemas/authSchemas";

type AuthFormProps = {
    mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
    const isLogin = mode === "login";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData | RegisterFormData>({
        resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    });

    function onSubmit(data: LoginFormData | RegisterFormData) {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-93.5 flex-col"
            noValidate
        >
            {!isLogin && (
                <>
                    <h2 className="text-text mb-3 self-start text-xl font-semibold">
                        Crie uma conta
                    </h2>

                    <div className="mb-0">
                        <InputField
                            label="Nome de usuário"
                            placeholder="Seu nome de usuário"
                            registration={register("username")}
                            error={
                                "username" in errors
                                    ? errors.username?.message
                                    : undefined
                            }
                        />
                    </div>
                </>
            )}

            <div className="mb-0">
                <InputField
                    label="E-mail"
                    type="email"
                    placeholder="Endereço de e-mail"
                    registration={register("email")}
                    error={errors.email?.message}
                />
            </div>

            <div className="mb-0">
                <InputField
                    label="Senha"
                    type="password"
                    placeholder="Senha secreta"
                    registration={register("password")}
                    error={errors.password?.message}
                />
            </div>

            {isLogin && (
                <Link
                    to="/forgot-password"
                    className="text-primary mb-8 text-xs font-normal underline"
                >
                    Esqueceu a senha ?
                </Link>
            )}

            {!isLogin && (
                <div className="mb-8">
                    <InputField
                        label="Confirme a senha"
                        type="password"
                        placeholder="Senha secreta"
                        registration={register("confirmPassword")}
                        error={
                            "confirmPassword" in errors
                                ? errors.confirmPassword?.message
                                : undefined
                        }
                    />
                </div>
            )}

            <button
                type="submit"
                className={`bg-primary h-11.5 cursor-pointer rounded-[20px] text-base font-semibold text-white transition hover:brightness-110 ${!isLogin ? "-mt-4" : ""}`}
            >
                {isLogin ? "Entrar" : "Criar Cadastro"}
            </button>
        </form>
    );
}

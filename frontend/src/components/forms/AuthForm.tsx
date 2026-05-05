import { Link } from "react-router-dom";
import { InputField } from "./InputField";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";

  return (
    <form className="flex w-full max-w-93.5 flex-col">
      {!isLogin && (
        <>
          <div className="mb-4">
            <InputField
              label="Nome de usuário"
              placeholder="Seu nome de usuário"
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <InputField
          label="E-mail"
          type="email"
          placeholder="Endereço de e-mail"
        />
      </div>

      <div className="mb-2">
        <InputField label="Senha" type="password" placeholder="Senha secreta" />
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
        <div className="mt-3 mb-8">
          <InputField
            label="Confirme a senha"
            type="password"
            placeholder="Senha secreta"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-primary h-11.5 rounded-[20px] text-base font-semibold text-white transition hover:brightness-110"
      >
        {isLogin ? "Entrar" : "Criar Cadastro"}
      </button>
    </form>
  );
}

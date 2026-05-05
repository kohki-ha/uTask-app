import { Header } from "../components/layout/Header";
import { AuthForm } from "../components/forms/AuthForm";
import { Link } from "react-router-dom";
import loginIllustration from "../assets/login-illustration.svg";

export function Login() {
  return (
    <div className="bg-page text-text min-h-screen">
      <Header variant="auth" />

      <main className="flex min-h-[calc(100vh-52px)] flex-col lg:flex-row lg:items-center lg:justify-center">
        <section className="flex flex-1 justify-center">
          <img
            src={loginIllustration}
            alt="Ilustração de pessoas organizando tarefas"
            className="m-12 hidden w-full max-w-135.5 lg:block"
          />
        </section>

        <div className="bg-divider-large mx-auto hidden h-[83vh] max-h-150 w-px lg:block" />

        <section className="m-6 flex flex-1 flex-col items-center">
          <h1 className="text-primary mb-12 text-center text-[42px] font-bold">
            uTask 3.0
          </h1>

          <AuthForm mode="login" />

          <div className="bg-divider-small mx-auto my-10 h-px w-[45%] max-w-42.5" />

          <Link
            to="/register"
            className="text-text text-center text-xs font-normal underline"
          >
            Não tem cadastro ? Crie uma conta
          </Link>
        </section>
      </main>
    </div>
  );
}

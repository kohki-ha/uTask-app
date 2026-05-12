import type { Theme } from "../hooks/useTheme";
import { Header } from "../components/layout/Header";
import { AuthForm } from "../components/forms/AuthForm";
import registerIllustration from "../assets/register-illustration.svg"

type LoginProps = {
    theme: Theme;
    onToggleTheme: () => void;
}

export function Register({ theme, onToggleTheme }: LoginProps) {
    return (
        <div className="min-h-screen bg-page text-text">
            <Header
                variant="auth"
                theme={theme}
                onToggleTheme={onToggleTheme}
            />

            <main className="flex min-h-[calc(100vh-52px)] flex-col lg:flex-row lg:items-center lg:justify-center">
                <section className="m-6 flex flex-1 flex-col items-center">
                    <h1 className="text-primary mb-2 text-center text-[42px] font-bold">
                        uTask 3.0
                    </h1>

                    <div className="bg-divider-small mx-auto mb-9 h-px w-[45%] max-w-42.5" />

                    <AuthForm mode="register" />
                </section>

                <div className="bg-divider-large mx-auto hidden h-[83vh] max-h-150 w-px lg:block" />

                <section className="flex flex-1 justify-center">
                    <img
                        src={registerIllustration}
                        alt="Ilustração de pessoa trabalhando"
                        className="m-12 hidden w-full max-w-135.5 lg:block"
                    />
                </section>
            </main>
        </div>
    )
}
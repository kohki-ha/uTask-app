import type { Theme } from "../../hooks/useTheme";
import logoDark from "../../assets/logo-dark.svg";
import logoLight from "../../assets/logo-light.svg";

type HeaderVariant = "auth" | "app";

type HeaderProps = {
    variant?: HeaderVariant;
    theme: Theme;
    onToggleTheme: () => void;
};

export function Header({
    variant = "auth",
    theme,
    onToggleTheme,
}: HeaderProps) {
    const isAppHeader = variant === "app";
    const isLight = theme === "light";
    const headerHeight = isAppHeader ? "h-20" : "h-13";

    return (
        <header
            className={`bg-header flex w-full items-center px-8 shadow-md ${headerHeight}`}
        >
            <div className="flex w-full items-center justify-between">
                {isAppHeader ? (
                    <>
                        <img
                            src={`${isLight ? logoLight : logoDark}`}
                            alt="Logo Unect"
                            className="h-10"
                        />

                        <h1 className="text-header-item text-[30px] font-bold">
                            uTask 3.0
                        </h1>
                    </>
                ) : (
                    <div />
                )}

                <button
                    type="button"
                    onClick={onToggleTheme}
                    aria-label="Alternar tema"
                    className={`relative h-6 w-12.5 cursor-pointer rounded-full transition ${
                        isLight
                            ? "bg-[linear-gradient(90deg,#FFC93F_0%,#FFC93F_0.01%,#FFE03F_100%)]"
                            : "bg-[linear-gradient(269.72deg,#222222_0.23%,#111111_0.24%,#2E2E2E_99.76%)]"
                    }`}
                >
                    <span
                        className={`absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FAFAFA] transition-all ${
                            isLight ? "left-0.5" : "left-7"
                        }`}
                    >
                        <span
                            className={`material-icons text-[16px]! leading-none ${
                                isLight ? "text-[#FBB910]" : "text-[#222222]"
                            }`}
                        >
                            {isLight ? "light_mode" : "dark_mode"}
                        </span>
                    </span>
                </button>
            </div>
        </header>
    );
}

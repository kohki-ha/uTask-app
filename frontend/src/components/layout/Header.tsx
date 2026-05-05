import { useState } from "react";

type HeaderVariant = "auth" | "app";

type HeaderProps = {
  variant?: HeaderVariant;
};

export function Header({ variant = "auth" }: HeaderProps) {
  const [isLightButton, setIsLightButton] = useState(false);

  const isAppHeader = variant === "app";

  return (
    <header className="bg-header flex h-13 w-full items-center px-8 shadow-md">
      <div className="flex w-full items-center justify-between">
        {isAppHeader ? (
          <h1 className="text-primary text-[30px] font-bold">uTask 3.0</h1>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={() => setIsLightButton((current) => !current)}
          aria-label="Alternar tema"
          className={`relative h-6 w-12.5 cursor-pointer rounded-full transition ${
            isLightButton
              ? "bg-[linear-gradient(90deg,#FFC93F_0%,#FFC93F_0.01%,#FFE03F_100%)]"
              : "bg-[linear-gradient(269.72deg,#222222_0.23%,#111111_0.24%,#2E2E2E_99.76%)]"
          }`}
        >
          <span
            className={`absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FAFAFA] transition-all ${
              isLightButton ? "left-0.5" : "left-7"
            }`}
          >
            <span
              className={`material-icons text-[16px] leading-none ${
                isLightButton ? "text-[#FBB910]" : "text-[#222222]"
              }`}
            >
              {isLightButton ? "light_mode" : "dark_mode"}
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}

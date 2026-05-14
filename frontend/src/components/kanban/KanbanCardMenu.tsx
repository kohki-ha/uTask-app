import { useState, useEffect, useRef } from "react";

export function KanbanCardMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="relative h-5" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsMenuOpen((current) => !current)}
                className={`cursor-pointer hover:text-primary ${isMenuOpen ? "text-primary" : ""}`}
            >
                <span className="material-icons text-base!">more_vert</span>
            </button>

            {isMenuOpen && (
                <div className="bg-popup-bg absolute right-0 top-[calc(100%+4px)] z-10 w-18  rounded-md shadow-[0_0_4px_rgba(0,0,0,0.25)]">
                    <button
                        type="button"
                        className="cursor-pointer flex w-full flex-row justify-center items-center gap-1 rounded-md p-2 text-left text-xs text-popup h-8"
                    >
                        <span className="material-icons text-base!">delete_outline</span>
                        Excluir
                    </button>
                </div>
            )}
        </div>
    );
}
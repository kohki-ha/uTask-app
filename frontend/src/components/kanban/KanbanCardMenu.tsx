import { useState, useEffect, useRef } from "react";

type KanbanCardMenuProps = {
    onDelete: () => void;
};

export function KanbanCardMenu({ onDelete }: KanbanCardMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
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

    function handleDelete() {
        onDelete();
        setIsMenuOpen(false);
    }

    return (
        <div className="relative h-5" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsMenuOpen((current) => !current)}
                className={`hover:text-primary cursor-pointer ${isMenuOpen ? "text-primary" : ""}`}
            >
                <span className="material-icons text-base!">more_vert</span>
            </button>

            {isMenuOpen && (
                <div className="bg-popup-bg absolute top-[calc(100%+4px)] right-0 z-10 w-18 rounded-md shadow-[0_0_4px_rgba(0,0,0,0.25)]">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="text-popup flex h-8 w-full cursor-pointer flex-row items-center justify-center gap-1 rounded-md p-2 text-left text-xs transition hover:brightness-110"
                    >
                        <span className="material-icons text-base!">
                            delete_outline
                        </span>
                        Excluir
                    </button>
                </div>
            )}
        </div>
    );
}

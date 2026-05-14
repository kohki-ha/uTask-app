import { useState } from "react";

type KanbanCardDescriptionProps = {
    description: string;
};

export function KanbanCardDescription({ description }: KanbanCardDescriptionProps) {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    // Se o card não tem descrição, retornamos um fragmento vazio
    if (!description) return null;

    return (
        <div className="flex flex-col items-start pr-4">
            <button
                type="button"
                onClick={() => setIsDescriptionVisible((current) => !current)}
                className={`flex cursor-pointer items-center gap-1 text-xs hover:text-primary ${isDescriptionVisible ? "text-primary mb-2" : "text-text"}`}
            >
                {isDescriptionVisible ? "Esconder descrição" : "Ler descrição"}
                <span className="material-icons text-sm">
                    {isDescriptionVisible ? "expand_less" : "expand_more"}
                </span>
            </button>

            {isDescriptionVisible && (
                <p className="text-xs">{description}</p>
            )}
        </div>
    );
}
import type { CardStatus, KanbanCardData } from "../../types/kanban";
import { KanbanCard } from "./KanbanCard";

type KanbanColumnProps = {
    title: string;
    status: CardStatus;
    cards: KanbanCardData[];
    showAddButton?: boolean;
    onMoveNext: (cardId: number) => void;
    onMovePrevious: (cardId: number) => void;
    onRestart: (cardId: number) => void;
    onDelete: (cardId: number) => void;
};

export function KanbanColumn({
    title,
    status,
    cards,
    showAddButton = false,
    onMoveNext,
    onMovePrevious,
    onRestart,
    onDelete
}: KanbanColumnProps) {
    const columnCards = cards
        .filter((card) => card.status === status)
        .sort(
            (firstCard, secondCard) =>
                new Date(secondCard.lastEditedAt).getTime() -
                new Date(firstCard.lastEditedAt).getTime(),
        );

    return (
        <section className="flex min-h-0 w-full max-w-73 flex-1 flex-col">
            <div className="mb-3 flex min-h-8 shrink-0 items-center justify-between">
                <h2 className="text-text text-xl font-normal">{title}</h2>

                {showAddButton && (
                    <button
                        type="button"
                        className="border-primary text-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2"
                    >
                        <span className="material-icons text-base!">add</span>
                    </button>
                )}
            </div>

            {columnCards.length > 0 ? (
                <div className="bg-column-bg flex min-h-0 flex-col gap-3 overflow-y-auto rounded-lg p-5 shadow-lg">
                    {columnCards.map((card) => (
                        <KanbanCard
                            key={card.id}
                            card={card}
                            onMoveNext={onMoveNext}
                            onMovePrevious={onMovePrevious}
                            onRestart={onRestart}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="border-scroll flex min-h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed p-5 text-center">
                    <p className="text-scroll text-sm">
                        {status === "todo" && "Nenhuma tarefa a fazer"}
                        {status === "doing" && "Nenhuma tarefa em andamento"}
                        {status === "done" && "Nenhuma tarefa feita"}
                    </p>
                </div>
            )}
        </section>
    );
}

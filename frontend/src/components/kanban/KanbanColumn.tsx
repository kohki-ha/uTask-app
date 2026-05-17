import type { CardStatus, KanbanCardData } from "../../types/kanban";
import { KanbanCard } from "./KanbanCard";

type KanbanColumnProps = {
    title: string;
    status: CardStatus;
    cards: KanbanCardData[];
    showAddButton?: boolean;
    className?: string;
    isDragEnabled?: boolean;
    draggedCardId?: number | null;
    isDragOver?: boolean;
    onOpenCreateTaskModal?: () => void;
    onCardDragStart?: (cardId: number) => void;
    onCardDragEnd?: () => void;
    onDragOverColumn?: (status: CardStatus) => void;
    onDragLeaveColumn?: (status: CardStatus) => void;
    onDropCard?: (status: CardStatus) => void;
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
    className = "",
    isDragEnabled = false,
    draggedCardId = null,
    isDragOver = false,
    onOpenCreateTaskModal,
    onCardDragStart,
    onCardDragEnd,
    onDragOverColumn,
    onDragLeaveColumn,
    onDropCard,
    onMoveNext,
    onMovePrevious,
    onRestart,
    onDelete,
}: KanbanColumnProps) {
    const columnCards = cards
        .filter((card) => card.status === status)
        .sort(
            (firstCard, secondCard) =>
                new Date(secondCard.lastEditedAt).getTime() -
                new Date(firstCard.lastEditedAt).getTime(),
        );

    function handleDragOver(event: React.DragEvent<HTMLElement>) {
        if (!isDragEnabled) return;

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        onDragOverColumn?.(status);
    }

    function handleDragLeave(event: React.DragEvent<HTMLElement>) {
        if (!isDragEnabled) return;

        const nextTarget = event.relatedTarget as Node | null;

        if (nextTarget && event.currentTarget.contains(nextTarget)) return;

        onDragLeaveColumn?.(status);
    }

    function handleDrop(event: React.DragEvent<HTMLElement>) {
        if (!isDragEnabled) return;

        event.preventDefault();
        onDropCard?.(status);
    }

    return (
        <section
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex min-h-0 w-full max-w-73 flex-1 flex-col transition ${
                isDragOver ? "ring-primary rounded-lg ring-2" : ""
            } ${className}`}
        >
            <div className="mb-3 flex min-h-8 shrink-0 items-center justify-between">
                <h2 className="text-text text-xl font-normal">{title}</h2>

                {showAddButton && (
                    <button
                        type="button"
                        onClick={onOpenCreateTaskModal}
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
                            isDragEnabled={isDragEnabled}
                            isDragging={draggedCardId === card.id}
                            onDragStart={onCardDragStart}
                            onDragEnd={onCardDragEnd}
                            onMoveNext={onMoveNext}
                            onMovePrevious={onMovePrevious}
                            onRestart={onRestart}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="border-kanban-empty-state flex min-h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed p-5 text-center">
                    <p className="text-kanban-empty-state text-sm">
                        {status === "todo" && "Nenhuma tarefa a fazer"}
                        {status === "doing" && "Nenhuma tarefa em andamento"}
                        {status === "done" && "Nenhuma tarefa feita"}
                    </p>
                </div>
            )}
        </section>
    );
}

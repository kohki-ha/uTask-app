import type { KanbanCardData } from "../../types/kanban";
import { KanbanCardMenu } from "./KanbanCardMenu";
import { KanbanCardDescription } from "./KanbanCardDescription";
import { KanbanCardActions } from "./KanbanCardActions";

type KanbanCardProps = {
    card: KanbanCardData;
    isDragEnabled?: boolean;
    isDragging?: boolean;
    onDragStart?: (cardId: number) => void;
    onDragEnd?: () => void;
    onMoveNext: (cardId: number) => void;
    onMovePrevious: (cardId: number) => void;
    onRestart: (cardId: number) => void;
    onDelete: (cardId: number) => void;
};

export function KanbanCard({
    card,
    isDragEnabled = false,
    isDragging = false,
    onDragStart,
    onDragEnd,
    onMoveNext,
    onMovePrevious,
    onRestart,
    onDelete,
}: KanbanCardProps) {
    function handleDragStart(event: React.DragEvent<HTMLElement>) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(card.id));
        onDragStart?.(card.id);
    }

    return (
        <article
            draggable={isDragEnabled}
            onDragStart={isDragEnabled ? handleDragStart : undefined}
            onDragEnd={isDragEnabled ? onDragEnd : undefined}
            aria-grabbed={isDragging || undefined}
            className={`bg-card-bg text-text flex flex-col rounded-[10px] p-3 shadow-lg transition ${
                isDragEnabled ? "lg:cursor-grab" : ""
            } ${isDragging ? "opacity-60" : ""}`}
        >
            <div className="mb-3 flex items-start justify-between">
                <h3
                    className={`text-sm font-semibold ${card.status === "done" ? "line-through" : ""}`}
                >
                    {card.title}
                </h3>

                <KanbanCardMenu onDelete={() => onDelete(card.id)} />
            </div>

            <div className="mt-auto flex items-end justify-between">
                <KanbanCardDescription description={card.description} />

                <KanbanCardActions
                    status={card.status}
                    onMoveNext={() => onMoveNext(card.id)}
                    onMovePrevious={() => onMovePrevious(card.id)}
                    onRestart={() => onRestart(card.id)}
                />
            </div>
        </article>
    );
}

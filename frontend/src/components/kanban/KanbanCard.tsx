import type { KanbanCardData } from "../../types/kanban";
import { KanbanCardMenu } from "./KanbanCardMenu";
import { KanbanCardDescription } from "./KanbanCardDescription";
import { KanbanCardActions } from "./KanbanCardActions";

type KanbanCardProps = {
    card: KanbanCardData;
};

export function KanbanCard({ card }: KanbanCardProps) {
    return (
        <article className="bg-card-bg text-text flex flex-col rounded-[10px] p-3 shadow-lg">
            <div className="mb-3 flex items-start justify-between">
                <h3
                    className={`text-sm font-semibold ${card.status === "done" ? "line-through" : ""}`}
                >
                    {card.title}
                </h3>

                <KanbanCardMenu />
            </div>

            <div className="mt-auto flex items-end justify-between">
                <KanbanCardDescription description={card.description} />

                <KanbanCardActions status={card.status} />
            </div>
        </article>
    );
}

import type { KanbanCardData } from "../../types/kanban";
import { KanbanCardMenu } from "./KanbanCardMenu";
import { KanbanCardDescription } from "./KanbanCardDescription";
import { KanbanCardActions } from "./KanbanCardActions";

type KanbanCardProps = {
    card: KanbanCardData;
};

export function KanbanCard({ card }: KanbanCardProps) {
    return (
        <article className="bg-card-bg text-text rounded-[10px] p-3 flex flex-col shadow-lg">
            <div className="flex items-start justify-between mb-3">
                <h3
                    className={`text-sm font-semibold ${card.status === "done" ? "line-through" : ""}`}
                >
                    {card.title}
                </h3>

                <KanbanCardMenu />
            </div>

            <div className="flex items-end justify-between mt-auto">
                <KanbanCardDescription description={card.description} />

                <KanbanCardActions status={card.status} />
            </div>
        </article>
    );
}
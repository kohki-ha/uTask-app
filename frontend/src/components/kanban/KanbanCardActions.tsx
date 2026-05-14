import type { KanbanCardData } from "../../types/kanban";

type KanbanCardActionsProps = {
    status: KanbanCardData["status"];
};

export function KanbanCardActions({ status }: KanbanCardActionsProps) {
    return (
        <div className="flex shrink-0 justify-end gap-2">
            {status !== "todo" && (
                <button
                    type="button"
                    className="border-primary text-primary flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border"
                >
                    <span className="material-icons text-base!">
                        chevron_left
                    </span>
                </button>
            )}

            {status !== "done" && (
                <button
                    type="button"
                    className="bg-primary flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-card-bg"
                >
                    <span className="material-icons text-base!">
                        chevron_right
                    </span>
                </button>
            )}

            {status === "done" && (
                <button
                    type="button"
                    className="bg-primary flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-card-bg"
                >
                    <span className="material-icons text-base!">replay</span>
                </button>
            )}
        </div>
    );
}
import type { KanbanCardData } from "../../types/kanban";

type KanbanCardActionsProps = {
    status: KanbanCardData["status"];
    onMoveNext: () => void;
    onMovePrevious: () => void;
    onRestart: () => void;
};

export function KanbanCardActions({
    status,
    onMoveNext,
    onMovePrevious,
    onRestart,
}: KanbanCardActionsProps) {
    return (
        <div className="flex shrink-0 justify-end gap-2">
            {status !== "todo" && (
                <button
                    type="button"
                    onClick={onMovePrevious}
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
                    onClick={onMoveNext}
                    className="bg-primary text-card-bg flex h-5 w-5 cursor-pointer items-center justify-center rounded-full"
                >
                    <span className="material-icons text-base!">
                        chevron_right
                    </span>
                </button>
            )}

            {status === "done" && (
                <button
                    type="button"
                    onClick={onRestart}
                    className="bg-primary text-card-bg flex h-5 w-5 cursor-pointer items-center justify-center rounded-full"
                >
                    <span className="material-icons text-base!">replay</span>
                </button>
            )}
        </div>
    );
}

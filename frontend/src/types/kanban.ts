export type CardStatus = "todo" | "doing" | "done";

export type KanbanCardData = {
    id: number;
    title: string;
    description: string;
    status: CardStatus;
    lastEditedAt: string;
};

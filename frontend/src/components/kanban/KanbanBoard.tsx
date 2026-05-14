import { useState } from "react";
import type { KanbanCardData } from "../../types/kanban";
import { KanbanColumn } from "./KanbanColumn";
import { CreateTaskModal } from "./CreateTaskModal";

const initialCard: KanbanCardData[] = [
    {
        id: 1,
        title: "Pagar conta de luz",
        description: "Pagar a conta antes do vencimento.",
        status: "todo",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 2,
        title: "Fazer compras no mercado grande",
        description: "Comprar batata, cenoura, feijão, alho, arroz e pipoca.",
        status: "todo",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 3,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 4,
        title: "Fazer manicure",
        description: "Card em andamento.",
        status: "done",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 5,
        title: "Fazer manicure",
        description: "Card finalizado.",
        status: "done",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 6,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 7,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 8,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 9,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
    {
        id: 10,
        title: "Fazer manicure",
        description:
            "Agendar horário para sábado horário para sábado horário para sábado horário para sábado horário para sábado.",
        status: "todo",
        lastEditedAt: "2026-05-14T10:00:00.000Z",
    },
];

export function KanbanBoard() {
    const [cards, setCards] = useState<KanbanCardData[]>(initialCard);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

    function createTask(title: string, description: string) {
        const newTask: KanbanCardData = {
            id: Date.now(),
            title,
            description,
            status: "todo",
            lastEditedAt: new Date().toISOString(),
        };

        setCards((currentCards) => [newTask, ...currentCards]);
    }

    function updateCardStatus(cardId: number, newStatus: KanbanCardData["status"]) {
        setCards((currentCards) =>
            currentCards.map((card) =>
                card.id === cardId
                    ? {
                        ...card,
                        status: newStatus,
                        lastEditedAt: new Date().toISOString(),
                    }
                    : card,
            ),
        );
    }

    function moveCardToNextColumn(cardId: number) {
        const card = cards.find((currentCard) => currentCard.id === cardId);

        if (!card) return;

        if (card.status === "todo") {
            updateCardStatus(cardId, "doing");
        }

        if (card.status === "doing") {
            updateCardStatus(cardId, "done");
        }
    }

    function moveCardToPreviousColumn(cardId: number) {
        const card = cards.find((currentCard) => currentCard.id === cardId);

        if (!card) return;

        if (card.status === "doing") {
            updateCardStatus(cardId, "todo");
        }

        if (card.status === "done") {
            updateCardStatus(cardId, "doing");
        }
    }

    function restartCard(cardId: number) {
        updateCardStatus(cardId, "todo");
    }

    function deleteCard(cardId: number) {
        setCards((currentCards) =>
            currentCards.filter((card) => card.id !== cardId),
        );
    }

    return (
        <>
            <section className="mx-auto mt-8 flex min-h-0 w-full max-w-240 flex-1 flex-col items-stretch gap-10 lg:flex-row lg:justify-between">
                <KanbanColumn
                    title="A fazer"
                    status="todo"
                    cards={cards}
                    showAddButton
                    onOpenCreateTaskModal={() => setIsCreateTaskModalOpen(true)}
                    onMoveNext={moveCardToNextColumn}
                    onMovePrevious={moveCardToPreviousColumn}
                    onRestart={restartCard}
                    onDelete={deleteCard}
                />

                <KanbanColumn
                    title="Em andamento"
                    status="doing"
                    cards={cards}
                    onMoveNext={moveCardToNextColumn}
                    onMovePrevious={moveCardToPreviousColumn}
                    onRestart={restartCard}
                    onDelete={deleteCard}
                />

                <KanbanColumn
                    title="Feito"
                    status="done"
                    cards={cards}
                    onMoveNext={moveCardToNextColumn}
                    onMovePrevious={moveCardToPreviousColumn}
                    onRestart={restartCard}
                    onDelete={deleteCard}
                />
            </section>

            {isCreateTaskModalOpen && (
                <CreateTaskModal
                    onClose={() => setIsCreateTaskModalOpen(false)}
                    onCreateTask={createTask}
                />
            )}
        </>
    );
}

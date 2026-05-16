import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { KanbanCardData } from "../../types/kanban";
import { KanbanColumn } from "./KanbanColumn";
import { CreateTaskModal } from "./CreateTaskModal";
import {
    createTaskRequest,
    deleteTaskRequest,
    listTasksRequest,
    updateTaskRequest,
} from "../../services/tasksService";

export function KanbanBoard() {
    const [cards, setCards] = useState<KanbanCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

    useEffect(() => {
        async function loadTasks() {
            try {
                const tasks = await listTasksRequest();
                setCards(tasks);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                    return;
                }

                toast.error("Erro ao carregar tasks.");
            } finally {
                setIsLoading(false);
            }
        }

        loadTasks();
    }, []);

    async function createTask(title: string, description: string) {
        try {
            const task = await createTaskRequest({
                title,
                description,
            });

            setCards((currentCards) => [task, ...currentCards]);

            toast.success("Task criada com sucesso!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                throw error;
            }

            const fallbackError = new Error("Erro ao criar task.");
            toast.error(fallbackError.message);
            throw fallbackError;
        }
    }

    async function updateCardStatus(
        cardId: number,
        newStatus: KanbanCardData["status"],
    ) {
        try {
            const updatedTask = await updateTaskRequest(cardId, {
                status: newStatus,
            });

            setCards((currentCards) =>
                currentCards.map((card) =>
                    card.id === cardId ? updatedTask : card,
                ),
            );
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                return;
            }

            toast.error("Erro ao atualizar task.");
        }
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

    async function deleteCard(cardId: number) {
        try {
            await deleteTaskRequest(cardId);

            setCards((currentCards) =>
                currentCards.filter((card) => card.id !== cardId),
            );

            toast.success("Task excluída com sucesso!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                return;
            }

            toast.error("Erro ao excluir task.");
        }
    }

    if (isLoading) {
        return (
            <div className="text-text flex flex-1 items-center justify-center">
                Carregando tasks...
            </div>
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

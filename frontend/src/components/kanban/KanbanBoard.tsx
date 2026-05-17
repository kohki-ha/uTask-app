import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { CardStatus, KanbanCardData } from "../../types/kanban";
import { KanbanColumn } from "./KanbanColumn";
import { CreateTaskModal } from "./CreateTaskModal";
import {
    createTaskRequest,
    deleteTaskRequest,
    listTasksRequest,
    updateTaskRequest,
} from "../../services/tasksService";

const kanbanColumns = [
    { title: "A fazer", status: "todo", showAddButton: true },
    { title: "Em andamento", status: "doing", showAddButton: false },
    { title: "Feito", status: "done", showAddButton: false },
] as const;

const DESKTOP_QUERY = "(min-width: 1024px)";
const SWIPE_THRESHOLD = 50;

export function KanbanBoard() {
    const [cards, setCards] = useState<KanbanCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [activeColumnIndex, setActiveColumnIndex] = useState(0);
    const [isDesktopBoard, setIsDesktopBoard] = useState(false);
    const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
    const [dragOverStatus, setDragOverStatus] = useState<CardStatus | null>(
        null,
    );
    const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

    const activeColumn = kanbanColumns[activeColumnIndex];

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

    useEffect(() => {
        const mediaQuery = window.matchMedia(DESKTOP_QUERY);

        function updateIsDesktopBoard() {
            setIsDesktopBoard(mediaQuery.matches);
        }

        updateIsDesktopBoard();
        mediaQuery.addEventListener("change", updateIsDesktopBoard);

        return () => {
            mediaQuery.removeEventListener("change", updateIsDesktopBoard);
        };
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

    function showPreviousColumn() {
        setActiveColumnIndex((currentIndex) =>
            currentIndex === 0 ? kanbanColumns.length - 1 : currentIndex - 1,
        );
    }

    function showNextColumn() {
        setActiveColumnIndex((currentIndex) =>
            currentIndex === kanbanColumns.length - 1 ? 0 : currentIndex + 1,
        );
    }

    function handleCardDragStart(cardId: number) {
        if (!isDesktopBoard) return;

        setDraggedCardId(cardId);
    }

    function clearDragState() {
        setDraggedCardId(null);
        setDragOverStatus(null);
    }

    function handleColumnDragOver(status: CardStatus) {
        if (!isDesktopBoard || draggedCardId === null) return;

        const draggedCard = cards.find((card) => card.id === draggedCardId);

        if (!draggedCard || draggedCard.status === status) {
            setDragOverStatus(null);
            return;
        }

        setDragOverStatus(status);
    }

    function handleColumnDragLeave(status: CardStatus) {
        setDragOverStatus((currentStatus) =>
            currentStatus === status ? null : currentStatus,
        );
    }

    function handleCardDrop(targetStatus: CardStatus) {
        if (!isDesktopBoard || draggedCardId === null) {
            clearDragState();
            return;
        }

        const draggedCard = cards.find((card) => card.id === draggedCardId);

        if (!draggedCard || draggedCard.status === targetStatus) {
            clearDragState();
            return;
        }

        const cardId = draggedCardId;

        clearDragState();
        updateCardStatus(cardId, targetStatus);
    }

    function handleSwipeStart(event: React.PointerEvent<HTMLDivElement>) {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        swipeStartRef.current = {
            x: event.clientX,
            y: event.clientY,
        };
    }

    function handleSwipeEnd(event: React.PointerEvent<HTMLDivElement>) {
        const swipeStart = swipeStartRef.current;

        if (!swipeStart) return;

        const deltaX = event.clientX - swipeStart.x;
        const deltaY = event.clientY - swipeStart.y;
        const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

        swipeStartRef.current = null;

        if (!isHorizontalSwipe || Math.abs(deltaX) < SWIPE_THRESHOLD) return;

        if (deltaX < 0) {
            showNextColumn();
            return;
        }

        showPreviousColumn();
    }

    function clearSwipeStart() {
        swipeStartRef.current = null;
    }

    function renderColumn(
        column: (typeof kanbanColumns)[number],
        className = "",
    ) {
        return (
            <KanbanColumn
                key={column.status}
                title={column.title}
                status={column.status}
                cards={cards}
                showAddButton={column.showAddButton}
                className={className}
                isDragEnabled={isDesktopBoard}
                draggedCardId={draggedCardId}
                isDragOver={dragOverStatus === column.status}
                onOpenCreateTaskModal={() => setIsCreateTaskModalOpen(true)}
                onCardDragStart={handleCardDragStart}
                onCardDragEnd={clearDragState}
                onDragOverColumn={handleColumnDragOver}
                onDragLeaveColumn={handleColumnDragLeave}
                onDropCard={handleCardDrop}
                onMoveNext={moveCardToNextColumn}
                onMovePrevious={moveCardToPreviousColumn}
                onRestart={restartCard}
                onDelete={deleteCard}
            />
        );
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
            <section className="mx-auto mt-8 flex min-h-0 w-full max-w-240 flex-1 flex-col items-stretch lg:flex-row lg:justify-between lg:gap-10">
                <div
                    onPointerDown={handleSwipeStart}
                    onPointerUp={handleSwipeEnd}
                    onPointerCancel={clearSwipeStart}
                    className="relative -mx-8 flex min-h-0 flex-1 touch-pan-y items-stretch justify-center px-8 lg:hidden"
                >
                    <button
                        type="button"
                        onClick={showPreviousColumn}
                        aria-label="Ver coluna anterior"
                        className="text-primary absolute top-1/2 left-3 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center transition hover:brightness-110"
                    >
                        <span className="material-icons text-3xl!">
                            chevron_left
                        </span>
                    </button>

                    {renderColumn(activeColumn, "mx-auto")}

                    <button
                        type="button"
                        onClick={showNextColumn}
                        aria-label="Ver próxima coluna"
                        className="text-primary absolute top-1/2 right-3 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center transition hover:brightness-110"
                    >
                        <span className="material-icons text-3xl!">
                            chevron_right
                        </span>
                    </button>
                </div>

                <div className="mt-3 flex shrink-0 justify-center gap-4 lg:hidden">
                    {kanbanColumns.map((column, index) => (
                        <button
                            key={column.status}
                            type="button"
                            onClick={() => setActiveColumnIndex(index)}
                            aria-label={`Ver coluna ${column.title}`}
                            aria-current={
                                activeColumnIndex === index ? "page" : undefined
                            }
                            className={`h-3 w-3 cursor-pointer rounded-full transition hover:brightness-110 ${
                                activeColumnIndex === index
                                    ? "bg-primary"
                                    : "bg-kanban-pagination-dot"
                            }`}
                        />
                    ))}
                </div>

                <div className="hidden min-h-0 w-full flex-1 items-stretch justify-between gap-10 lg:flex">
                    {kanbanColumns.map((column) => renderColumn(column))}
                </div>
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

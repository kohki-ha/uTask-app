import type { CardStatus, KanbanCardData } from "../types/kanban";
import { apiFetch } from "./api";

type CreateTaskRequest = {
    title: string;
    description: string;
};

type UpdateTaskRequest = {
    title?: string;
    description?: string;
    status?: CardStatus;
};

export function listTasksRequest() {
    return apiFetch<KanbanCardData[]>("/tasks", {
        method: "GET",
        auth: true,
    });
}

export function createTaskRequest(data: CreateTaskRequest) {
    return apiFetch<KanbanCardData>("/tasks", {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
    });
}

export function updateTaskRequest(id: number, data: UpdateTaskRequest) {
    return apiFetch<KanbanCardData>(`/tasks/${id}`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(data),
    });
}

export function deleteTaskRequest(id: number) {
    return apiFetch<void>(`/tasks/${id}`, {
        method: "DELETE",
        auth: true,
    });
}

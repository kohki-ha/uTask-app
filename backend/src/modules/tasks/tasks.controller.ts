import type { FastifyReply, FastifyRequest } from "fastify";
import {
    createTask,
    deleteTask,
    listTasks,
    updateTask,
} from "./tasks.service";
import type { TaskStatus } from "../../entities/Task";

type CreateTaskBody = {
    title: string;
    description?: string;
};

type UpdateTaskBody = {
    title?: string;
    description?: string;
    status?: TaskStatus;
};

type TaskParams = {
    id: string;
};

export async function listTasksController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const tasks = await listTasks(request.userId);

    return reply.status(200).send(tasks);
}

export async function createTaskController(
    request: FastifyRequest<{ Body: CreateTaskBody }>,
    reply: FastifyReply,
) {
    try {
        const task = await createTask({
            title: request.body.title,
            ...(request.body.description !== undefined && {
                description: request.body.description,
            }),
            userId: request.userId,
        });

        return reply.status(201).send(task);
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno." });
    }
}

export async function updateTaskController(
    request: FastifyRequest<{
        Params: TaskParams;
        Body: UpdateTaskBody;
    }>,
    reply: FastifyReply,
) {
    try {
        const task = await updateTask({
            taskId: Number(request.params.id),
            userId: request.userId,
            ...(request.body.title !== undefined && {
                title: request.body.title,
            }),
            ...(request.body.description !== undefined && {
                description: request.body.description,
            }),
            ...(request.body.status !== undefined && {
                status: request.body.status,
            }),
        });

        return reply.status(200).send(task);
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno." });
    }
}

export async function deleteTaskController(
    request: FastifyRequest<{ Params: TaskParams }>,
    reply: FastifyReply,
) {
    try {
        await deleteTask(Number(request.params.id), request.userId);

        return reply.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno." });
    }
}
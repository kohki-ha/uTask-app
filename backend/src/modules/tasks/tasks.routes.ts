import type { FastifyInstance } from "fastify";

import { authenticate } from "../../middlewares/authenticate";
import {
    createTaskController,
    deleteTaskController,
    listTasksController,
    updateTaskController,
} from "./tasks.controller";

export async function tasksRoutes(app: FastifyInstance) {
    app.addHook("preHandler", authenticate);

    app.get("/", listTasksController);
    app.post("/", createTaskController);
    app.patch("/:id", updateTaskController);
    app.delete("/:id", deleteTaskController);
}

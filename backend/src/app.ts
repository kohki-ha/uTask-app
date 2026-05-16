import fastify from "fastify";
import cors from "@fastify/cors";
import { authRoutes } from "./modules/auth/auth.routes";
import { tasksRoutes } from "./modules/tasks/tasks.routes";

export function buildApp() {
    const app = fastify({
        logger: true,
    });

    app.register(cors, {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });

    app.get("/health", async () => {
        return { status: "ok" };
    });

    app.register(authRoutes, {
        prefix: "/auth",
    });

    app.register(tasksRoutes, {
        prefix: "/tasks",
    });

    return app;
}

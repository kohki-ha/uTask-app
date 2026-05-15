import fastify from "fastify";
import cors from "@fastify/cors";
import { authRoutes } from "./modules/auth/auth.routes";

export function buildApp() {
  const app = fastify({
    logger: true,
  });

  app.register(cors, {
    origin: "http://localhost:5173",
  });

  app.get("/health", async () => {
    return { status: "ok" };
  });

  app.register(authRoutes, {
    prefix: "/auth",
  });

  return app;
}
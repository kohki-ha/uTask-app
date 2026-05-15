import type { FastifyInstance } from "fastify";
import { loginController, registerController } from "./auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", registerController);
  app.post("/login", loginController);
}
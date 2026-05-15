import { AppDataSource } from "./config/data-source";
import { env } from "./config/env";
import { buildApp } from "./app";

async function startServer() {
  await AppDataSource.initialize();

  const app = buildApp();

  await app.listen({
    port: env.port,
    host: "0.0.0.0",
  });
}

startServer();
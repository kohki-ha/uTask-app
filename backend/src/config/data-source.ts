import "reflect-metadata";
import { DataSource } from "typeorm";

import { env } from "./env";
import { User } from "../entities/User";
import { Task } from "../entities/Task";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    entities: [User, Task],
    synchronize: true,
});

import "dotenv/config";
import type { SignOptions } from "jsonwebtoken";

const jwtExpiresIn: SignOptions["expiresIn"] = "1d";

export const env = {
    port: Number(process.env.BACKEND_PORT) || 3000,

    db: {
        host: process.env.DB_HOST || "postgres",
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_DATABASE || "",
    },

    jwtSecret: process.env.JWT_SECRET || "",
    jwtExpiresIn,
};

if (!env.db.username) {
    throw new Error("DB_USERNAME não foi definido.");
}

if (!env.db.password) {
    throw new Error("DB_PASSWORD não foi definido.");
}

if (!env.db.database) {
    throw new Error("DB_DATABASE não foi definido.");
}

if (!env.jwtSecret) {
    throw new Error("JWT_SECRET não foi definido.");
}

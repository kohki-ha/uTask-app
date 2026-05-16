import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

import { env } from "../config/env";

type JwtPayload = {
    sub: string;
};

declare module "fastify" {
    interface FastifyRequest {
        userId: string;
    }
}

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return reply.status(401).send({ message: "Token não informado." });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
        return reply.status(401).send({ message: "Token inválido." });
    }

    try {
        const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

        request.userId = decoded.sub;
    } catch {
        return reply.status(401).send({ message: "Token inválido." });
    }
}
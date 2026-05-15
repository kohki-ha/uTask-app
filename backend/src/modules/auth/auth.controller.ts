import type { FastifyReply, FastifyRequest } from "fastify";
import { loginUser, registerUser } from "./auth.service";

type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

export async function registerController(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  try {
    const result = await registerUser(request.body);

    return reply.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message });
    }

    return reply.status(500).send({ message: "Erro interno." });
  }
}

export async function loginController(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  try {
    const result = await loginUser(request.body);

    return reply.status(200).send(result);
  } catch {
    return reply.status(401).send({
      message: "E-mail ou senha inválidos.",
    });
  }
}
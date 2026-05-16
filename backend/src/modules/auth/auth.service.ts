import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../config/data-source";
import { env } from "../../config/env";
import { User } from "../../entities/User";

type RegisterInput = {
    username: string;
    email: string;
    password: string;
};

type LoginInput = {
    email: string;
    password: string;
};

const userRepository = AppDataSource.getRepository(User);

function createToken(userId: string) {
    return jwt.sign({ sub: userId }, env.jwtSecret, {
        expiresIn: env.jwtExpiresIn,
    });
}

export async function registerUser(data: RegisterInput) {
    const userAlreadyExists = await userRepository.findOne({
        where: { email: data.email },
    });

    if (userAlreadyExists) {
        throw new Error("E-mail já cadastrado.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = userRepository.create({
        username: data.username,
        email: data.email,
        passwordHash,
    });

    await userRepository.save(user);

    const token = createToken(user.id);

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };
}

export async function loginUser(data: LoginInput) {
    const user = await userRepository.findOne({
        where: { email: data.email },
    });

    if (!user) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.passwordHash,
    );

    if (!isPasswordValid) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const token = createToken(user.id);

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };
}

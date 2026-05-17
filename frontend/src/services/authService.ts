import type { LoginFormData, RegisterFormData } from "../schemas/authSchemas";
import { apiFetch } from "./api";

type AuthResponse = {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
};

export function loginRequest(data: LoginFormData) {
    return apiFetch<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function registerRequest(data: RegisterFormData) {
    return apiFetch<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
        }),
    });
}

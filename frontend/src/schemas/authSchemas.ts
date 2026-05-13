import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email("Digite um e-mail válido.")
        .min(1, "O e-mail é obrigatório."),

    password: z.string().min(1, "A senha é obrigatória."),
});

export const registerSchema = z
    .object({
        username: z.string().min(1, "O nome de usuário é obrigatório."),

        email: z
            .email("Digite um e-mail válido.")
            .min(1, "O e-mail é obrigatório."),

        password: z.string().min(1, "A senha é obrigatória."),

        confirmPassword: z.string().min(1, "Confirme sua senha."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
    });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

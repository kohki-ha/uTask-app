const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type ApiFetchOptions = RequestInit & {
    auth?: boolean;
};

export async function apiFetch<T>(
    path: string,
    options: ApiFetchOptions = {},
): Promise<T> {
    const token = localStorage.getItem("utask:token");

    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type") && options.body) {
        headers.set("Content-Type", "application/json");
    }

    if (options.auth && token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(errorData?.message || "Erro inesperado.");
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}
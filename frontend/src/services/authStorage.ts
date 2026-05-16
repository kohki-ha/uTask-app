const TOKEN_KEY = "utask:token";

export function saveAuthToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeAuthToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
    return Boolean(getAuthToken());
}
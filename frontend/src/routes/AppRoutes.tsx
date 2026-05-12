import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { Theme } from "../hooks/useTheme";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

type AppRoutesProps = {
    theme: Theme;
    onToggleTheme: () => void;
};

export function AppRoutes({ theme, onToggleTheme }: AppRoutesProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route
                    path="/login"
                    element={
                        <Login theme={theme} onToggleTheme={onToggleTheme} />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <Register theme={theme} onToggleTheme={onToggleTheme} />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

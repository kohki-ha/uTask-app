import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";
import { useTheme } from "./hooks/useTheme";

export default function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <AppRoutes theme={theme} onToggleTheme={toggleTheme} />
            <Toaster richColors position="top-right" />
        </>
    );
}

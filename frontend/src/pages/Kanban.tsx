import type { Theme } from "../hooks/useTheme";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { DailyPhrase } from "../components/kanban/DailyPhrase";
import { KanbanBoard } from "../components/kanban/KanbanBoard";

type KanbanProps = {
    theme: Theme;
    onToggleTheme: () => void;
};

export function Kanban({ theme, onToggleTheme }: KanbanProps) {
    return (
        <div className="bg-page text-text flex h-screen flex-col overflow-hidden">
            <Header variant="app" theme={theme} onToggleTheme={onToggleTheme} />

            <main className="flex min-h-0 flex-1 flex-col px-8 pb-8">
                <DailyPhrase />
                <KanbanBoard />
            </main>

            <Footer />
        </div>
    );
}

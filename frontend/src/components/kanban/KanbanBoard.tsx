import type { KanbanCardData } from "../../types/kanban";
import { KanbanColumn } from "./KanbanColumn";

const cards: KanbanCardData[] = [
    {
        id: 1,
        title: "Pagar conta de luz",
        description: "Pagar a conta antes do vencimento.",
        status: "todo",
    },
    {
        id: 2,
        title: "Fazer compras no mercado grande",
        description: "Comprar batata, cenoura, feijão, alho, arroz e pipoca.",
        status: "todo",
    },
    {
        id: 3,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
    },
    {
        id: 4,
        title: "Fazer manicure",
        description: "Card em andamento.",
        status: "done",
    },
    {
        id: 5,
        title: "Fazer manicure",
        description: "Card finalizado.",
        status: "done",
    },
    {
        id: 6,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
    },
    {
        id: 7,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
    },
    {
        id: 8,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
    },
    {
        id: 9,
        title: "Fazer manicure",
        description: "Agendar horário para sábado.",
        status: "todo",
    },
    {
        id: 10,
        title: "Fazer manicure",
        description: "Agendar horário para sábado horário para sábado horário para sábado horário para sábado horário para sábado.",
        status: "todo",
    },
];

export function KanbanBoard() {
    return (
        <section className="mx-auto mt-8 flex flex-1 w-full max-w-240 flex-col gap-10 lg:flex-row lg:justify-between items-stretch min-h-0">
            <KanbanColumn
                title="A fazer"
                status="todo"
                cards={cards}
                showAddButton
            />

            <KanbanColumn title="Em andamento" status="doing" cards={cards} />

            <KanbanColumn title="Feito" status="done" cards={cards} />
        </section>
    );
}
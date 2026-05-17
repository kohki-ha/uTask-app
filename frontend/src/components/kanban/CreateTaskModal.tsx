import { useState } from "react";

type CreateTaskModalProps = {
    onClose: () => void;
    onCreateTask: (title: string, description: string) => Promise<void>;
};

export function CreateTaskModal({
    onClose,
    onCreateTask,
}: CreateTaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!title.trim()) return;

        try {
            setIsSubmitting(true);

            await onCreateTask(title.trim(), description.trim());

            onClose();
        } catch {
            // O componente pai já exibe o erro; aqui só mantemos o modal aberto.
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-modal-overlay fixed inset-0 z-50 flex items-center justify-center px-8">
            <div className="bg-create-task-modal-bg relative w-full max-w-118 rounded-[20px] p-8 pb-10 shadow-xl">
                <div className="relative mb-9 flex items-center justify-center">
                    <h2 className="text-primary border-primary border-b-4 text-xl font-semibold">
                        Nova Task
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="border-primary text-primary absolute right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition hover:brightness-110"
                        aria-label="Fechar modal"
                    >
                        <span className="material-icons text-sm!">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="text-text mb-2 text-xs font-semibold">
                        Título *
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Digite o título da task"
                        className="bg-create-task-field-bg text-text placeholder:text-label mb-5 h-10 rounded-[10px] px-5 text-sm outline-none"
                    />

                    <label className="text-text mb-2 text-xs font-semibold">
                        Descrição
                    </label>

                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Digite a descrição da task"
                        className="bg-create-task-field-bg text-text placeholder:text-label mb-10 min-h-22 resize-none rounded-[10px] px-5 py-4 text-sm outline-none"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary h-13 cursor-pointer rounded-[20px] text-lg text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Criando..." : "Criar task"}
                    </button>
                </form>
            </div>
        </div>
    );
}

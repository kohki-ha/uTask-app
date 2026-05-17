import { useEffect, useState } from "react";
import { getDailyPhrase } from "../../services/adviceService";

export function DailyPhrase() {
    const [phrase, setPhrase] = useState("Carregando frase do dia...");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function loadPhrase() {
            try {
                const translatedPhrase = await getDailyPhrase();
                setPhrase(translatedPhrase);
            } catch {
                setPhrase("Não foi possível carregar a frase do dia agora.");
            }
        }

        loadPhrase();
    }, []);

    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsModalOpen(false);
            }
        }

        if (isModalOpen) {
            document.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isModalOpen]);

    const icon = (
        <div className="bg-daily-bg2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
            <div className="bg-daily-bg1 flex h-8.5 w-8.5 items-center justify-center rounded-full">
                <span className="material-icons text-daily-icon text-2xl!">
                    tips_and_updates
                </span>
            </div>
        </div>
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isModalOpen}
                className="bg-daily-button text-daily-button-text mx-auto mt-8 flex w-full max-w-73 cursor-pointer items-center gap-4 rounded-2xl p-5 text-left shadow-lg transition hover:brightness-110 sm:hidden"
            >
                {icon}
                <span className="text-base font-semibold">Frase do dia</span>
            </button>

            <section className="bg-daily-card-bg text-text mx-auto mt-8 hidden w-full max-w-155 gap-4 rounded-2xl p-5 shadow-lg sm:flex">
                {icon}

                <div>
                    <h2 className="mb-2 text-sm font-bold">Frase do dia</h2>
                    <p className="text-sm leading-5">{phrase}</p>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className="bg-modal-overlay fixed inset-0 z-40 flex items-center justify-center px-8 sm:hidden"
                    onClick={() => setIsModalOpen(false)}
                >
                    <article
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="daily-phrase-title"
                        className="bg-daily-modal-bg text-text w-full max-w-157 rounded-[20px] p-5 shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-5 flex items-center gap-4">
                            {icon}

                            <h2
                                id="daily-phrase-title"
                                className="flex-1 text-base font-bold"
                            >
                                Frase do dia
                            </h2>

                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Fechar frase do dia"
                                className="border-primary text-primary flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition hover:brightness-110"
                            >
                                <span className="material-icons text-lg!">
                                    close
                                </span>
                            </button>
                        </div>

                        <p className="text-base leading-7">{phrase}</p>
                    </article>
                </div>
            )}
        </>
    );
}

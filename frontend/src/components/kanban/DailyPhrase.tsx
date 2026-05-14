import { useEffect, useState } from "react";
import { getDailyPhrase } from "../../services/adviceService";

export function DailyPhrase() {
    const [phrase, setPhrase] = useState(
        "Carregando frase do dia...",
    );

    useEffect(() => {
        async function loadPhrase() {
            try {
                const translatedPhrase = await getDailyPhrase();
                setPhrase(translatedPhrase);
            } catch {
                setPhrase(
                    "Não foi possível carregar a frase do dia agora.",
                );
            }
        }

        loadPhrase();
    }, []);

    return (
        <section className="bg-column-bg text-text mx-auto mt-8 flex w-full max-w-155 gap-4 rounded-2xl p-5 shadow-lg">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-daily-bg2">
                <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-daily-bg1">
                    <span className="material-icons text-2xl text-daily-icon">
                        tips_and_updates
                    </span>
                </div>
            </div>

            <div>
                <h2 className="mb-2 text-sm font-bold">Frase do dia</h2>
                <p className="text-sm leading-5">{phrase}</p>
            </div>
        </section>
    );
}
export function Footer() {
    return (
        <footer className="bg-footer flex flex-col items-center justify-between px-5 py-3 text-sm text-white md:flex-row md:flex-wrap md:gap-x-6 md:px-40">
            <div>
                © Processo de Trainee{" "}
                <a href="https://unect.com.br" className="font-semibold">
                    Unect Jr.
                </a>
            </div>

            <div className="flex items-center gap-1">
                Feito com
                <span className="material-icons text-footer-heart text-base!">
                    favorite
                </span>
                por <span className="font-semibold">Thales Hasegawa</span>
            </div>
        </footer>
    );
}

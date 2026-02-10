import { Link } from 'react-router-dom';

/**
 * Landing Layout Component
 * 
 * Layout for landing pages with header navigation and footer.
 * Supports industrial theme detection for yellow warning tape border.
 * 
 * @param {ReactNode} children - Page content
 * @param {boolean} isIndustrial - Whether to show industrial theme styling
 */
export default function LandingLayout({ children, isIndustrial = false }) {
    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-500">
            {/* Industrial Warning Tape Border */}
            {isIndustrial && (
                <div className="h-3 w-full bg-yellow-400 border-b-4 border-black flex overflow-hidden">
                    <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] opacity-10"></div>
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <span className="text-2xl">🚀</span>
                        <span>SaaS Mestre</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-foreground/70">
                        <a href="#features" className="hover:text-primary transition-colors">
                            Funcionalidades
                        </a>
                        <a href="#pricing" className="hover:text-primary transition-colors">
                            Planos
                        </a>
                        <a href="#contact" className="hover:text-primary transition-colors">
                            Contato
                        </a>
                    </nav>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <button className="px-6 py-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all text-sm font-semibold">
                                Área do Cliente
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t border-border bg-background py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-lg">SaaS Mestre</h4>
                        <p className="text-sm text-muted-foreground">
                            Construindo o futuro, um bloco de cada vez.
                        </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2025 Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}

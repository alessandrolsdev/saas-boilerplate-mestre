import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/stores/useAuth';

/**
 * Register Page Component
 * 
 * User registration page with form validation.
 */
export default function Register() {
    const navigate = useNavigate();
    const register = useAuth((state) => state.register);

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Validation
        if (form.password !== form.confirmPassword) {
            setErrorMessage('As senhas não coincidem.');
            return;
        }

        if (form.password.length < 6) {
            setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setIsLoading(true);

        try {
            await register({
                email: form.email,
                password: form.password,
                full_name: form.full_name
            });
            // Auto-redirects to dashboard on success
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(
                error.response?.data?.detail ||
                'Erro ao criar conta. Tente novamente mais tarde.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-background p-8 rounded-2xl shadow-xl border border-border">
                {/* Header */}
                <div className="text-center">
                    <span className="text-4xl mb-2 block">🚀</span>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Crie sua conta
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Junte-se à plataforma SaaS Mestre.
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Nome Completo
                            </label>
                            <input
                                name="full_name"
                                type="text"
                                required
                                value={form.full_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground"
                                placeholder="Ex: João da Silva"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Email Corporativo
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground"
                                placeholder="voce@empresa.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Senha
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Confirmar Senha
                            </label>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 text-center">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md"
                    >
                        {isLoading ? 'Criando conta...' : 'Cadastrar Gratuitamente'}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="text-center text-sm">
                    <p className="text-muted-foreground">
                        Já tem uma conta?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-accent hover:underline"
                        >
                            Fazer Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

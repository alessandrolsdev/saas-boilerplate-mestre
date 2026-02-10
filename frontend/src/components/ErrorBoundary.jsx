import React from 'react';

/**
 * ErrorBoundary - Captura erros React gracefully
 * 
 * Uso:
 * <ErrorBoundary>
 *   <YourApp />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console (in production, send to error tracking service)
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // TODO: Send to error tracking service (Sentry, LogRocket, etc)
        // logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">
                    <div className="max-w-2xl w-full glass p-8 rounded-2xl text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-red-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Oops! Algo deu errado
                        </h1>

                        {/* Message */}
                        <p className="text-slate-300 mb-8">
                            Encontramos um erro inesperado. Nossa equipe foi notificada e estamos trabalhando para resolver o problema.
                        </p>

                        {/* Error Details (only in development) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-8 text-left">
                                <summary className="cursor-pointer text-sm text-slate-400 hover:text-white mb-2">
                                    Detalhes técnicos (desenvolvimento)
                                </summary>
                                <pre className="bg-slate-900/50 p-4 rounded-lg text-xs text-red-300 overflow-auto max-h-64">
                                    {this.state.error.toString()}
                                    {'\n\n'}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            >
                                Tentar Novamente
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-6 py-3 border-2 border-purple-500/30 text-white rounded-xl font-semibold bg-white/5 hover:bg-white/10 transition-all"
                            >
                                Voltar ao Início
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

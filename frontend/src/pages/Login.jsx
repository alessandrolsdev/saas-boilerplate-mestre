import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/stores/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LayoutDashboard } from 'lucide-react'

// Schema de Validação (Senior Pattern)
const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
})

export default function Login() {
    const navigate = useNavigate()
    const login = useAuth((state) => state.login)
    const error = useAuth((state) => state.error)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            await login(data.email, data.password)
            navigate('/dashboard')
        } catch (err) {
            // Erro já tratado no store
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            {/* Background Decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-indigo-500/20 p-3 rounded-xl mb-4 text-indigo-400">
                        <LayoutDashboard size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">SaaS Mestre</h1>
                    <p className="text-slate-400">Enterprise Dashboard Access</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="admin@saasmestre.com"
                            className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500"
                        />
                        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Senha</label>
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="••••••"
                            className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500"
                        />
                        {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" isLoading={loading}>
                        Entrar
                    </Button>
                </form>
            </motion.div>
        </div>
    )
}

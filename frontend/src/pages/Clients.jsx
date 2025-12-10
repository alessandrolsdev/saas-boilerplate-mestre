import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Filter, MoreHorizontal } from 'lucide-react'
import clientService from '@/services/clients'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Clients() {
    const [searchTerm, setSearchTerm] = useState('')

    const { data: clients, isLoading } = useQuery({
        queryKey: ['clients'],
        queryFn: clientService.getAll
    })

    // Filter Logic
    const filteredClients = clients?.filter(client =>
        client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    if (isLoading) return <div className="text-white">Carregando Clientes...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white tracking-tight">Gestão de Clientes</h1>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/50 p-4 rounded-xl flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                    <Input
                        placeholder="Buscar clientes por nome ou email..."
                        className="pl-10 bg-slate-950 border-slate-800 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white">
                    <Filter size={18} className="mr-2" /> Filtros
                </Button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-xs ">
                        <tr>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Plano</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">MRR</th>
                            <th className="p-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {filteredClients.map((client) => (
                            <tr key={client.id} className="hover:bg-slate-800/30 transition-colors group">
                                <td className="p-4">
                                    <div className="font-bold text-white">{client.full_name}</div>
                                    <div className="text-xs text-slate-500">{client.email}</div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-slate-800 px-2 py-1 rounded text-xs text-slate-200 border border-slate-700">
                                        {client.plan}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${client.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                                        }`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="p-4 font-mono font-bold text-white">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(client.mrr)}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-slate-800 rounded text-slate-500 hover:text-white">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

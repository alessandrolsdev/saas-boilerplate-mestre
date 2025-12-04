<script setup>
import UiButton from '@/components/UiButton.vue';
import { 
  Scale, Gavel, ShieldCheck, FileText, Clock, ChevronRight 
} from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-[#C5A059] selection:text-white">
    <nav class="fixed w-full z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <div class="flex items-center gap-2">
            <div class="bg-[#C5A059] p-1.5 rounded-sm">
              <Scale class="h-6 w-6 text-slate-900" />
            </div>
            <span class="text-2xl font-serif text-white tracking-wide">Lex<span class="text-[#C5A059]">Flow</span></span>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-sm text-slate-300 hover:text-[#C5A059] transition-colors uppercase tracking-widest">Soluções</a>
            <a href="#" class="text-sm text-slate-300 hover:text-[#C5A059] transition-colors uppercase tracking-widest">Escritórios</a>
            <router-link to="/login">
              <UiButton variant="legal-outline" className="!px-6 !py-2 text-sm">Área do Cliente</UiButton>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1e293b] to-transparent opacity-20 pointer-events-none"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 px-3 py-1 border border-[#C5A059]/30 rounded-full bg-[#C5A059]/10">
              <span class="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span class="text-xs font-medium text-[#C5A059] tracking-widest uppercase">Software Jurídico #1 do Brasil</span>
            </div>
            
            <h1 class="text-5xl lg:text-7xl font-serif text-white leading-tight">
              Domine seus <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5D09D]">
                Prazos e Processos
              </span>
            </h1>
            
            <p class="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-[#C5A059] pl-6">
              A inteligência definitiva para escritórios que não admitem erros. Elimine a papelada, automatize o follow-up e foque na estratégia jurídica.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/register">
                <UiButton variant="legal-primary" :icon="ChevronRight">Começar Teste Gratuito</UiButton>
              </router-link>
              <UiButton variant="legal-outline">Ver Demonstração</UiButton>
            </div>
            
            <div class="pt-8 flex items-center gap-4 text-sm text-slate-500">
              <div class="flex -space-x-2">
                <div v-for="i in 4" :key="i" class="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0F172A] flex items-center justify-center text-xs">
                   ⚖️
                </div>
              </div>
              <p>+500 Escritórios potencializados</p>
            </div>
          </div>

          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-[#C5A059] to-blue-600 rounded-lg blur opacity-20"></div>
            <div class="relative bg-slate-800/50 border border-slate-700 backdrop-blur-xl rounded-lg p-6 shadow-2xl">
              <div class="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div class="text-xs text-slate-400 uppercase tracking-widest">Dashboard Executivo</div>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-slate-900/60 rounded border border-slate-700/50">
                  <div class="flex items-center gap-4">
                    <div class="p-2 bg-green-900/30 text-green-400 rounded">
                      <ShieldCheck class="w-6 h-6" />
                    </div>
                    <div>
                      <div class="text-sm text-slate-400">Processos Ativos</div>
                      <div class="text-xl font-serif text-white">1.248</div>
                    </div>
                  </div>
                  <div class="text-green-400 text-sm font-medium">+12% este mês</div>
                </div>

                <div class="flex items-center justify-between p-4 bg-slate-900/60 rounded border border-slate-700/50">
                   <div class="flex items-center gap-4">
                    <div class="p-2 bg-red-900/30 text-red-400 rounded">
                      <Clock class="w-6 h-6" />
                    </div>
                    <div>
                      <div class="text-sm text-slate-400">Prazos Fatais (Hoje)</div>
                      <div class="text-xl font-serif text-white">03</div>
                    </div>
                  </div>
                  <div class="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs animate-pulse">Atenção</div>
                </div>

                <div class="h-32 bg-slate-900/60 rounded border border-slate-700/50 flex items-end p-4 gap-2">
                  <div v-for="(h, i) in [40, 70, 45, 90, 60, 80, 55]" :key="i" class="flex-1 bg-gradient-to-t from-[#C5A059] to-[#C5A059]/20 rounded-t opacity-80 hover:opacity-100 transition-opacity" :style="{height: `${h}%`}"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-[#0B1120]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-serif text-white mb-4">Tecnologia que impõe respeito</h2>
          <p class="text-slate-400">Funcionalidades desenhadas para a rotina da advocacia de elite.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-8 bg-slate-800/30 border border-slate-800 hover:border-[#C5A059]/50 transition-colors group">
            <Gavel class="w-10 h-10 text-[#C5A059] mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-serif text-white mb-3">Intimações Automáticas</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              Nosso robô monitora 100% dos diários oficiais. Receba alertas antes mesmo da publicação oficial.
            </p>
          </div>
          
          <div class="p-8 bg-slate-800/30 border border-slate-800 hover:border-[#C5A059]/50 transition-colors group">
            <FileText class="w-10 h-10 text-[#C5A059] mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-serif text-white mb-3">Gestão Documental</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              OCR inteligente que lê seus PDFs e organiza as pastas automaticamente por cliente e instância.
            </p>
          </div>

          <div class="p-8 bg-slate-800/30 border border-slate-800 hover:border-[#C5A059]/50 transition-colors group">
            <Scale class="w-10 h-10 text-[#C5A059] mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-serif text-white mb-3">Financeiro Integrado</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              Controle de honorários, sucumbência e emissão de boletos em um clique. O fim da inadimplência.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <footer class="py-12 border-t border-slate-800 text-center text-slate-500 text-sm">
      <p>© 2025 LexFlow Tecnologias Jurídicas. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>
<script setup>
import UiButton from '@/components/UiButton.vue';
import { 
  ArrowRight, Zap, Code2, 
  Palette, Cpu, MousePointer2, // Ícones da Metodologia
  Scale, HardHat, ChevronRight // Ícones do Portfólio
} from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
    
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
    </div>

    <nav class="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div class="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div class="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
            <Code2 class="w-5 h-5 text-white" />
          </div>
          SaaS Mestre<span class="text-purple-500">.</span>
        </div>
        <div class="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
          <a href="#metodologia" class="hover:text-white transition-colors">Metodologia</a>
          <a href="#showcase" class="hover:text-white transition-colors">Portfólio</a>
          <a href="#contato" class="hover:text-white transition-colors">Contato</a>
        </div>
        <UiButton variant="master-primary" class="!px-5 !py-2 text-sm !h-auto">Consultoria</UiButton>
      </div>
    </nav>

    <section class="relative z-10 pt-40 pb-24 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span class="text-sm font-medium text-zinc-300">Agenda aberta para Q1 2025</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
          Não é só código.<br/>
          É Engenharia de Vendas.
        </h1>
        
        <p class="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Eu crio interfaces "Camaleão": designs que mudam radicalmente para se alinhar à psicologia exata do seu cliente. Do sóbrio ao industrial.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#showcase">
            <UiButton variant="master-primary" :icon="ArrowRight">Ver a Diferença</UiButton>
          </a>
          <UiButton variant="master-secondary" :icon="Zap">Conheça o Processo</UiButton>
        </div>
      </div>
    </section>

    <section id="metodologia" class="relative z-10 py-24 px-6 border-t border-white/5 bg-black/40">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-12 lg:gap-16">
          
          <div class="space-y-6">
            <div class="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              <Palette class="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-3 text-white">Design Adaptativo</h3>
              <p class="text-zinc-400 leading-relaxed text-lg">
                Um advogado não compra como um engenheiro. Eu adapto cores, tipografia e layout para gerar a emoção certa: confiança ou robustez.
              </p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <Cpu class="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-3 text-white">Performance Extrema</h3>
              <p class="text-zinc-400 leading-relaxed text-lg">
                Landing pages que carregam em milissegundos. Código React/Vue limpo, otimizado para SEO e preparado para escalar.
              </p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
              <MousePointer2 class="w-7 h-7 text-green-400" />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-3 text-white">Foco em Conversão</h3>
              <p class="text-zinc-400 leading-relaxed text-lg">
                Cada pixel é pensado para levar ao clique. Botões estratégicos, copy direcionada e fluxo visual sem distrações.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="showcase" class="relative z-10 py-32 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">Escolha seu Universo</h2>
          <p class="text-zinc-400 max-w-xl mx-auto text-lg">
            Clique nos cards abaixo para ver o sistema se transformar completamente.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 lg:gap-16">
          
          <router-link to="/advogado" class="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#C5A059]/50 transition-all duration-500 block">
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                 style="background-image: url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/90 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
            
            <div class="absolute bottom-0 left-0 p-10 w-full">
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-[#C5A059] p-2 rounded-sm"><Scale class="w-6 h-6 text-slate-900" /></div>
                <span class="text-[#C5A059] font-serif tracking-widest text-sm uppercase">Nicho Jurídico</span>
              </div>
              <h3 class="text-4xl font-serif text-white mb-3">LexFlow</h3>
              <p class="text-slate-300 mb-8 line-clamp-2 text-lg">Design sóbrio, cores autoritárias e foco em segurança para escritórios.</p>
              <div class="flex items-center text-[#C5A059] font-medium group-hover:translate-x-2 transition-transform">
                Ver Projeto <ChevronRight class="w-5 h-5 ml-1" />
              </div>
            </div>
          </router-link>

          <router-link to="/terraplanagem" class="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-yellow-500/50 transition-all duration-500 block">
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                 style="background-image: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop')">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
            
            <div class="absolute bottom-0 left-0 p-10 w-full">
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-yellow-500 p-2 rounded-none"><HardHat class="w-6 h-6 text-black" /></div>
                <span class="text-yellow-500 font-black tracking-widest text-sm uppercase">Nicho Engenharia</span>
              </div>
              <h3 class="text-4xl font-black text-white uppercase mb-3 tracking-tighter">TerraForce</h3>
              <p class="text-zinc-300 mb-8 line-clamp-2 text-lg">Visual brutalista, alto contraste e elementos industriais.</p>
              <div class="flex items-center text-yellow-500 font-bold uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                Ver Projeto <ChevronRight class="w-5 h-5 ml-1" />
              </div>
            </div>
          </router-link>

        </div>
      </div>
    </section>

    <section id="contato" class="relative z-10 py-32 px-6 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
          Pronto para dominar seu nicho?
        </h2>
        <p class="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Eu construo a ferramenta digital perfeita para o seu negócio escalar. Sem templates genéricos, apenas estratégia pura.
        </p>
        <UiButton variant="master-primary" class="!px-10 !py-5 !text-lg !h-auto">
          Solicitar Orçamento
        </UiButton>
      </div>
    </section>

    <footer class="py-10 text-center text-zinc-600 text-sm border-t border-white/5 relative z-10">
      <p>© 2025 SaaS Mestre. Development & Strategy.</p>
    </footer>
  </div>
</template>
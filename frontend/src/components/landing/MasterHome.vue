<script setup>
import { ArrowRight, Zap, Code2, Palette, Cpu, MousePointer2, Scale, HardHat, ChevronRight } from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
    
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
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
        <button class="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
          Agendar Consultoria
        </button>
      </div>
    </nav>

    <section class="relative z-10 pt-40 pb-20 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span class="text-sm font-medium text-zinc-300">Agenda aberta para Q1 2025</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          Não é só código.<br/>
          É Engenharia de Vendas.
        </h1>
        
        <p class="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Eu crio interfaces "Camaleão": designs que mudam radicalmente para se alinhar à psicologia exata do seu cliente. Do sóbrio ao industrial.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#showcase" class="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all">
            Ver a Diferença na Prática
            <ArrowRight class="ml-2 w-5 h-5" />
          </a>
          <button class="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white backdrop-blur-sm border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
            <Zap class="mr-2 w-5 h-5" /> Conheça o Processo
          </button>
        </div>
      </div>
    </section>

    <section id="metodologia" class="relative z-10 py-24 border-t border-white/5 bg-black/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-12">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Palette class="w-6 h-6 text-purple-400" />
            </div>
            <h3 class="text-2xl font-bold">Design Adaptativo</h3>
            <p class="text-zinc-400 leading-relaxed">
              Um advogado não compra como um engenheiro. Eu adapto cores, tipografia e layout para gerar a emoção certa.
            </p>
          </div>
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Cpu class="w-6 h-6 text-blue-400" />
            </div>
            <h3 class="text-2xl font-bold">Performance Extrema</h3>
            <p class="text-zinc-400 leading-relaxed">
              Landing pages que carregam em milissegundos. Código limpo, otimizado para SEO e preparado para escalar.
            </p>
          </div>
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <MousePointer2 class="w-6 h-6 text-green-400" />
            </div>
            <h3 class="text-2xl font-bold">Foco em Conversão</h3>
            <p class="text-zinc-400 leading-relaxed">
              Cada pixel é pensado para levar ao clique. Botões estratégicos e fluxo visual sem distrações.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="showcase" class="relative z-10 py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">Escolha seu Universo</h2>
          <p class="text-zinc-400 max-w-xl mx-auto">
            Veja como a mesma estrutura base se transforma completamente para atender nichos opostos. Clique para testar.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 lg:gap-16">
          
          <router-link 
            to="/advogado"
            class="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#C5A059]/50 transition-all duration-500 block"
          >
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
            
            <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full z-20">
              <div class="flex items-center gap-3 mb-4">
                <Scale class="w-8 h-8 text-[#C5A059] mb-2" />
                <span class="text-[#C5A059] font-serif tracking-widest text-sm uppercase">Jurídico</span>
              </div>
              <h3 class="text-4xl font-serif text-white mb-2">LexFlow</h3>
              <p class="text-slate-300 mb-8 line-clamp-2">
                Design sóbrio, cores autoritárias e foco em segurança para escritórios high-ticket.
              </p>
              <span class="px-6 py-2 border border-[#C5A059] text-[#C5A059] text-xs uppercase tracking-widest rounded-sm group-hover:bg-[#C5A059] group-hover:text-slate-900 transition-colors inline-block">
                Ver Template
              </span>
            </div>
          </router-link>

          <router-link 
            to="/terraplanagem"
            class="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-yellow-500/50 transition-all duration-500 block"
          >
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
            
            <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full z-20">
              <div class="flex items-center gap-3 mb-4">
                <HardHat class="w-8 h-8 text-yellow-500 mb-2" />
                <span class="text-yellow-500 font-black tracking-widest text-sm uppercase">Engenharia</span>
              </div>
              <h3 class="text-4xl font-black text-white uppercase mb-2 tracking-tighter">TerraForce</h3>
              <p class="text-zinc-300 mb-8 line-clamp-2">
                Visual brutalista, alto contraste e elementos industriais para transmitir robustez.
              </p>
              <span class="px-6 py-2 bg-yellow-500 text-black font-bold text-xs uppercase tracking-widest border-b-4 border-black group-hover:translate-y-1 group-hover:border-b-0 transition-all inline-block">
                Ver Template
              </span>
            </div>
          </router-link>

        </div>
      </div>
    </section>

    <footer class="py-8 text-center text-zinc-600 text-sm border-t border-white/5 relative z-10">
      <p>© 2025 SaaS Mestre. Development & Strategy.</p>
    </footer>
  </div>
</template>
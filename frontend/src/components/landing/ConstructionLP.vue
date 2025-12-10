<script setup>
/**
 * Componente ConstructionLP (Landing Page Engenharia).
 * 
 * Landing page temática para o nicho de engenharia/construção (TerraForce).
 * Utiliza cores industriais (Amarelo, Preto, Cinza), tipografia robusta e design brutalista.
 * 
 * @component
 */
import UiButton from '@/components/UiButton.vue';
import {
  HardHat, ArrowRight, Truck, Wrench, BarChart3
} from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans">

    <!-- Faixa de Atenção -->
    <div class="bg-yellow-400 h-2 w-full flex overflow-hidden">
      <div
        class="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] opacity-10">
      </div>
    </div>

    <!-- Navigation -->
    <nav class="border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <div class="flex items-center gap-3">
            <div class="bg-zinc-900 p-2">
              <HardHat class="h-6 w-6 text-yellow-400" />
            </div>
            <span class="text-2xl font-black uppercase tracking-tighter italic">Terra<span
                class="text-yellow-500">Force</span></span>
          </div>

          <div class="hidden md:flex items-center space-x-6 font-bold text-sm uppercase tracking-wide">
            <a href="#" class="hover:text-yellow-600">Frota</a>
            <a href="#" class="hover:text-yellow-600">Obras</a>
            <router-link to="/register">
              <UiButton variant="eng-primary" className="!py-2 !px-6 text-sm">Cotar Agora</UiButton>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden bg-zinc-50">
      <div class="absolute inset-0"
        style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 40px 40px;"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="order-2 lg:order-1">
            <div class="inline-block bg-zinc-900 text-white font-bold text-xs uppercase px-3 py-1 mb-6 tracking-widest">
              Sistema de Gestão de Maquinário v4.0
            </div>
            <h1 class="text-6xl lg:text-7xl font-black text-zinc-900 uppercase leading-[0.9] tracking-tighter mb-6">
              Controle <br />
              Total da <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                Sua Obra.
              </span>
            </h1>
            <p class="text-xl text-zinc-600 font-medium mb-8 max-w-md">
              Pare de perder dinheiro com máquinas paradas. Monitore combustível, horas trabalhadas e manutenção
              preventiva em um único painel robusto.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/register">
                <UiButton variant="eng-primary" :icon="ArrowRight">Iniciar Teste de Campo</UiButton>
              </router-link>
              <UiButton variant="eng-secondary">Ver Planos</UiButton>
            </div>

            <div class="mt-12 flex items-center gap-6 border-t border-zinc-200 pt-6">
              <div>
                <div class="text-3xl font-black text-zinc-900">15%</div>
                <div class="text-xs font-bold uppercase text-zinc-500">Redução de Diesel</div>
              </div>
              <div class="w-px h-10 bg-zinc-300"></div>
              <div>
                <div class="text-3xl font-black text-zinc-900">100%</div>
                <div class="text-xs font-bold uppercase text-zinc-500">Controle de Frota</div>
              </div>
            </div>
          </div>

          <!-- Hero Image/Dashboard -->
          <div class="order-1 lg:order-2 relative">
            <div class="absolute top-10 -right-10 w-full h-full border-4 border-yellow-400 z-0"></div>
            <div
              class="relative z-10 bg-zinc-900 aspect-[4/3] shadow-2xl flex items-center justify-center overflow-hidden group">
              <div
                class="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700">
              </div>

              <div class="absolute bottom-6 left-6 right-6 bg-white p-4 shadow-lg border-l-8 border-yellow-500">
                <div class="flex justify-between items-end">
                  <div>
                    <div class="text-xs font-bold text-zinc-500 uppercase">Status da Escavadeira #04</div>
                    <div class="text-lg font-black text-zinc-900 flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                      EM OPERAÇÃO
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs font-bold text-zinc-500 uppercase">Horímetro</div>
                    <div class="font-mono text-zinc-900 font-bold">12,450h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-zinc-900 text-white relative">
      <div
        class="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#EAB308,#EAB308_20px,#000_20px,#000_40px)]">
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl font-black uppercase tracking-tighter mb-2">Ferramentas Pesadas</h2>
          <div class="w-24 h-2 bg-yellow-500"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            class="bg-zinc-800 p-8 border border-zinc-700 hover:bg-zinc-750 hover:border-yellow-500 transition-all group cursor-default">
            <div
              class="bg-zinc-900 w-16 h-16 flex items-center justify-center border-2 border-zinc-700 group-hover:border-yellow-500 group-hover:bg-yellow-500 transition-all mb-6">
              <Truck class="w-8 h-8 text-white group-hover:text-black transition-colors" />
            </div>
            <h3 class="text-xl font-bold uppercase mb-3">Rastreio de Frota</h3>
            <p class="text-zinc-400 text-sm leading-relaxed">Saiba exatamente onde cada máquina está e o que está
              fazendo. Cerca virtual geográfica.</p>
          </div>

          <div
            class="bg-zinc-800 p-8 border border-zinc-700 hover:bg-zinc-750 hover:border-yellow-500 transition-all group cursor-default">
            <div
              class="bg-zinc-900 w-16 h-16 flex items-center justify-center border-2 border-zinc-700 group-hover:border-yellow-500 group-hover:bg-yellow-500 transition-all mb-6">
              <Wrench class="w-8 h-8 text-white group-hover:text-black transition-colors" />
            </div>
            <h3 class="text-xl font-bold uppercase mb-3">Manutenção Preditiva</h3>
            <p class="text-zinc-400 text-sm leading-relaxed">O sistema avisa antes da máquina quebrar. Gerencie trocas
              de óleo, filtros e pneus.</p>
          </div>

          <div
            class="bg-zinc-800 p-8 border border-zinc-700 hover:bg-zinc-750 hover:border-yellow-500 transition-all group cursor-default">
            <div
              class="bg-zinc-900 w-16 h-16 flex items-center justify-center border-2 border-zinc-700 group-hover:border-yellow-500 group-hover:bg-yellow-500 transition-all mb-6">
              <BarChart3 class="w-8 h-8 text-white group-hover:text-black transition-colors" />
            </div>
            <h3 class="text-xl font-bold uppercase mb-3">Gestão de Custos</h3>
            <p class="text-zinc-400 text-sm leading-relaxed">Relatórios de custo por obra, por operador e por litro de
              combustível consumido.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-zinc-950 py-12 text-center text-zinc-600 border-t border-zinc-800">
      <p class="font-mono text-xs uppercase">© 2025 TerraForce Systems. Engenharia Bruta.</p>
    </footer>
  </div>
</template>
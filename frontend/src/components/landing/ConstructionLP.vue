<script setup>
import UiButton from '@/components/UiButton.vue';
import { HardHat, ArrowRight } from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans">
    <div class="bg-yellow-400 h-2 w-full flex overflow-hidden">
      <div class="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] opacity-10"></div>
    </div>

    <nav class="border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <div class="flex items-center gap-3">
            <div class="bg-zinc-900 p-2">
              <HardHat class="h-6 w-6 text-yellow-400" />
            </div>
            <span class="text-2xl font-black uppercase tracking-tighter italic">Terra<span class="text-yellow-500">Force</span></span>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/login">
              <UiButton variant="eng-primary" class="!py-2 !px-6 text-sm !h-auto">Cotar Agora</UiButton>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="relative py-20 lg:py-32 overflow-hidden bg-zinc-50">
      <div class="absolute inset-0" style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 40px 40px;"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="order-2 lg:order-1">
            <div class="inline-block bg-zinc-900 text-white font-bold text-xs uppercase px-3 py-1 mb-6 tracking-widest">
              Sistema de Gestão v4.0
            </div>
            <h1 class="text-6xl lg:text-7xl font-black text-zinc-900 uppercase leading-[0.9] tracking-tighter mb-6">
              Controle <br/>
              Total da <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                Sua Obra.
              </span>
            </h1>
            <p class="text-xl text-zinc-600 font-medium mb-8 max-w-md">
              Pare de perder dinheiro com máquinas paradas. Painel único de gestão de frota.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4">
               <router-link to="/login">
                 <UiButton variant="eng-primary" :icon="ArrowRight">Iniciar Teste</UiButton>
               </router-link>
               <UiButton variant="eng-secondary">Ver Planos</UiButton>
            </div>
          </div>

          <div class="order-1 lg:order-2 relative">
             <div class="absolute top-10 -right-10 w-full h-full border-4 border-yellow-400 z-0"></div>
             <div class="relative z-10 bg-zinc-900 aspect-[4/3] shadow-2xl flex items-center justify-center overflow-hidden group border-4 border-white">
                <div class="absolute inset-0 opacity-80 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                
                <div class="absolute bottom-6 left-6 right-6 bg-white p-4 shadow-lg border-l-8 border-yellow-500">
                  <div class="flex justify-between items-end">
                    <div>
                      <div class="text-xs font-bold text-zinc-500 uppercase">Status #04</div>
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
  </div>
</template>
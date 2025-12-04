<script setup>
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import LandingLayout from '@/layouts/LandingLayout.vue';
import { niches } from '@/data/niches';
import MasterHome from '@/components/landing/MasterHome.vue';
import LegalLP from '@/components/landing/LegalLP.vue';
import ConstructionLP from '@/components/landing/ConstructionLP.vue';

const route = useRoute();
const content = computed(() => niches[route.meta.niche || 'default'] || niches.default);

// --- DETECÇÃO DO COMPONENTE ---
// Se for uma rota específica, carrega o componente dedicado (Design Rico).
// Se for a raiz ou rota genérica, usa o MasterHome ou o layout padrão com dados.
const currentComponent = computed(() => {
  if (route.path === '/advogado') return LegalLP;
  if (route.path === '/terraplanagem') return ConstructionLP;
  
  // Se não for nicho específico, assume Master (Home do Dev)
  if (content.value.style.mode === 'master') return MasterHome;
  
  // Fallback (caso você crie um nicho novo sem componente dedicado, usa esse template genérico abaixo)
  return null; 
});

const isDark = computed(() => content.value.style.mode === 'dark');
const isIndustrial = computed(() => content.value.style.mode === 'industrial');

watchEffect(() => {
  const root = document.documentElement;
  const colors = content.value.style.colors || {};
  
  // Injeta variáveis CSS
  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(key, value);
  }
  
  root.style.fontFamily = content.value.style.font === 'serif' 
    ? '"Playfair Display", serif' 
    : '"Inter", sans-serif';
});
</script>

<template>
  <component :is="currentComponent" v-if="currentComponent" />

  <LandingLayout v-else>
    <section class="hero" :class="{ 'hero-dark': isDark, 'hero-industrial': isIndustrial }">
      <div v-if="isDark" class="bg-glow"></div>
      <div v-if="isIndustrial" class="bg-grid"></div>

      <div class="container hero-content">
        <div class="text-area">
          <span class="badge">{{ content.hero.badge }}</span>
          <h1 v-html="content.hero.title"></h1>
          <p class="subtitle">{{ content.hero.subtitle }}</p>
          <div class="cta-group">
            <router-link to="/register" class="btn-primary">
              {{ content.hero.cta }} <span v-if="isIndustrial">➝</span>
            </router-link>
            <a href="#features" class="btn-secondary">Saber mais</a>
          </div>
        </div>
        
        <div class="visual-area">
          <div v-if="content.hero.image" class="image-wrapper">
             <div v-if="isIndustrial" class="industrial-border"></div>
             <img :src="content.hero.image" alt="Visual" class="niche-image" />
             <div v-if="isIndustrial" class="data-card">
               <div class="status"><span class="dot"></span> EM OPERAÇÃO</div>
               <div class="metric">12,450h</div>
             </div>
          </div>
          <div v-else class="mockup-card glass-effect">
            <div class="mockup-header">
              <div class="dots"><span class="d r"></span><span class="d y"></span><span class="d g"></span></div>
              <span class="m-title">DASHBOARD EXECUTIVO</span>
            </div>
            <div class="mockup-body">
              <div class="stat-row">
                <div class="stat-icon">⚖️</div>
                <div class="stat-info"><div class="val">1.248</div><div class="lbl">Processos Ativos</div></div>
              </div>
              <div class="graph-placeholder">
                <div class="bar" style="height:40%"></div><div class="bar" style="height:70%"></div><div class="bar" style="height:50%"></div><div class="bar" style="height:90%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features" :class="{ 'feat-dark': isDark }">
      <div class="container">
        <div class="section-header">
          <h2>Funcionalidades Exclusivas</h2>
        </div>
        <div class="features-grid">
          <div v-for="(feat, index) in content.features" :key="index" class="feature-card">
            <div class="icon-box">{{ feat.icon }}</div>
            <h3>{{ feat.title }}</h3>
            <p>{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </LandingLayout>
</template>

<style lang="scss" scoped>
// Mantenha os estilos existentes do template genérico aqui
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 10; }
.hero { padding: 8rem 0 6rem; position: relative; overflow: hidden; }
// ... (Copie o resto do CSS do LandingView anterior se for usar o modo genérico)
// Se você só vai usar Master/Legal/Construction, esse CSS é opcional.
</style>
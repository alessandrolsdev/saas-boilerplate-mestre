<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const message = ref('Carregando...');

onMounted(async () => {
  try {
    // Conectando com seu Backend local
    const res = await axios.get('http://127.0.0.1:8000/');
    message.value = res.data.message;
  } catch (error) {
    message.value = 'Erro ao conectar com API';
    console.error(error);
  }
});
</script>

<template>
  <div class="container">
    <h1>SaaS Starter Kit</h1>
    <div class="status-card">
      <p>Status da API: <strong>{{ message }}</strong></p>
    </div>
  </div>
</template>

<style lang="scss">
// Importando variáveis
@use '@/assets/styles/variables' as *;

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: $background-bg;
  color: $text-main;
  font-family: sans-serif;
}

.status-card {
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: $border-radius;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
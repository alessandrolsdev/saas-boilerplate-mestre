<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue'; // <--- Importando a Moldura
import clientService from '@/services/clients';
import BaseModal from '@/components/BaseModal.vue';

const clients = ref([]);
const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ full_name: '', email: '', phone: '', document: '', notes: '' });

const fetchClients = async () => {
  try {
    clients.value = await clientService.getAll();
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    await clientService.create(form.value);
    await fetchClients();
    isModalOpen.value = false;
    form.value = { full_name: '', email: '', phone: '', document: '', notes: '' };
  } catch (error) {
    alert('Erro ao criar cliente');
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchClients);
</script>

<template>
  <MainLayout> <div class="page-content">
      <header class="content-header">
        <div class="header-text">
          <h3>Base de Contatos</h3>
          <p>Gerencie seus clientes e leads</p>
        </div>
        <button class="btn-primary" @click="isModalOpen = true">
          + Novo Cliente
        </button>
      </header>

      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Documento</th>
              <th style="text-align: right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id">
              <td>
                <div class="user-cell">
                  <div class="avatar-placeholder">{{ client.full_name.charAt(0) }}</div>
                  <span class="font-medium">{{ client.full_name }}</span>
                </div>
              </td>
              <td>
                <div class="contact-cell">
                  <span>{{ client.email }}</span>
                  <span class="sub-text">{{ client.phone }}</span>
                </div>
              </td>
              <td>{{ client.document || '-' }}</td>
              <td style="text-align: right">
                <button class="btn-icon">✏️</button>
              </td>
            </tr>
            <tr v-if="clients.length === 0">
              <td colspan="4" class="empty-state">
                <span class="icon">📭</span>
                <p>Nenhum cliente cadastrado ainda.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BaseModal :isOpen="isModalOpen" title="Novo Cliente" @close="isModalOpen = false">
        <form @submit.prevent="handleSubmit" class="standard-form">
          <div class="form-group">
            <label>Nome Completo</label>
            <input v-model="form.full_name" required placeholder="Ex: João Silva" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="form.email" placeholder="email@cliente.com" />
            </div>
            <div class="form-group">
              <label>WhatsApp</label>
              <input v-model="form.phone" required placeholder="(11) 99999-9999" />
            </div>
          </div>
          <div class="form-group">
            <label>CPF/CNPJ</label>
            <input v-model="form.document" placeholder="000.000.000-00" />
          </div>
          <button type="submit" class="btn-block" :disabled="isLoading">
            {{ isLoading ? 'Salvando...' : 'Cadastrar Cliente' }}
          </button>
        </form>
      </BaseModal>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
// Estilos locais aprimorados para combinar com o tema
.page-content { display: flex; flex-direction: column; gap: 1.5rem; }

.content-header {
  display: flex; justify-content: space-between; align-items: center;
  h3 { font-size: 1.1rem; color: $text-main; margin-bottom: 0.25rem; }
  p { font-size: 0.9rem; color: $text-muted; }
}

.btn-primary {
  background: $primary-color; color: white; border: none; padding: 0.6rem 1.2rem;
  border-radius: $radius-md; cursor: pointer; font-weight: 500; transition: background 0.2s;
  &:hover { background: $primary-hover; }
}

.table-card {
  background: $bg-surface; border-radius: $radius-lg; border: 1px solid $border-color;
  box-shadow: $shadow-sm; overflow: hidden;

  table {
    width: 100%; border-collapse: collapse;
    th { background: $bg-app; padding: 1rem; text-align: left; font-size: 0.8rem; text-transform: uppercase; color: $text-muted; font-weight: 600; }
    td { padding: 1rem; border-top: 1px solid $border-color; color: $text-main; font-size: 0.95rem; }
  }
}

.user-cell {
  display: flex; align-items: center; gap: 0.75rem;
  .avatar-placeholder { width: 32px; height: 32px; background: #e0e7ff; color: $primary-color; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem; }
  .font-medium { font-weight: 500; }
}

.contact-cell {
  display: flex; flex-direction: column;
  .sub-text { font-size: 0.8rem; color: $text-muted; }
}

.empty-state {
  text-align: center; padding: 3rem; color: $text-muted;
  .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; opacity: 0.5; }
}

.btn-icon { background: none; border: none; cursor: pointer; opacity: 0.6; transition: opacity 0.2s; &:hover { opacity: 1; } }

// Formulário Padrão (Reutilizável)
.standard-form {
  .form-group { margin-bottom: 1rem; }
  .form-row { display: flex; gap: 1rem; .form-group { flex: 1; } }
  label { display: block; margin-bottom: 0.4rem; font-size: 0.85rem; font-weight: 500; color: $text-main; }
  input { width: 100%; padding: 0.6rem; border: 1px solid $border-color; border-radius: $radius-md; outline: none; &:focus { border-color: $accent-color; } }
  .btn-block { width: 100%; padding: 0.75rem; background: $accent-color; color: white; border: none; border-radius: $radius-md; cursor: pointer; margin-top: 0.5rem; &:hover { background: $accent-hover; } }
}
</style>
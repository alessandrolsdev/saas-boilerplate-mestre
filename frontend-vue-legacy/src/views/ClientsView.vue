<script setup>
/**
 * View ClientsView.
 * 
 * Tela de gerenciamento de clientes. Permite listar e cadastrar novos clientes.
 * 
 * @component
 */
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import clientService from '@/services/clients';
import BaseModal from '@/components/BaseModal.vue';

const clients = ref([]);
const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ full_name: '', email: '', phone: '', document: '', notes: '' });

/**
 * Busca a lista de clientes da API.
 */
const fetchClients = async () => {
  try {
    clients.value = await clientService.getAll();
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
  }
};

/**
 * Envia o formulário de cadastro de cliente.
 */
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
  <MainLayout>
    <div class="space-y-6">

      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 class="text-2xl font-bold text-foreground">Base de Contatos</h3>
          <p class="text-muted-foreground">Gerencie seus clientes e leads</p>
        </div>
        <button
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm"
          @click="isModalOpen = true">
          + Novo Cliente
        </button>
      </header>

      <div class="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-secondary/50 text-muted-foreground border-b border-border">
              <tr>
                <th class="px-6 py-4 font-semibold">Nome</th>
                <th class="px-6 py-4 font-semibold">Contato</th>
                <th class="px-6 py-4 font-semibold">Documento</th>
                <th class="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="client in clients" :key="client.id" class="hover:bg-secondary/20 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">
                      {{ client.full_name.charAt(0) }}
                    </div>
                    <span class="font-medium text-foreground">{{ client.full_name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="text-foreground">{{ client.email }}</span>
                    <span class="text-xs text-muted-foreground">{{ client.phone }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-muted-foreground">{{ client.document || '-' }}</td>
                <td class="px-6 py-4 text-right">
                  <button class="text-muted-foreground hover:text-accent transition-colors"
                    aria-label="Editar cliente">✏️</button>
                </td>
              </tr>
              <tr v-if="clients.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-muted-foreground">
                  <span class="text-4xl block mb-2 opacity-50">📭</span>
                  Nenhum cliente cadastrado ainda.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <BaseModal :isOpen="isModalOpen" title="Novo Cliente" @close="isModalOpen = false">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Nome Completo</label>
            <input v-model="form.full_name" required placeholder="Ex: João Silva"
              class="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input type="email" v-model="form.email" placeholder="email@cliente.com"
                class="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">WhatsApp</label>
              <input v-model="form.phone" required placeholder="(11) 99999-9999"
                class="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">CPF/CNPJ</label>
            <input v-model="form.document" placeholder="000.000.000-00"
              class="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none" />
          </div>

          <button type="submit" :disabled="isLoading"
            class="w-full py-2.5 bg-accent text-accent-foreground font-bold rounded-lg hover:opacity-90 transition-opacity mt-2">
            {{ isLoading ? 'Salvando...' : 'Cadastrar Cliente' }}
          </button>
        </form>
      </BaseModal>
    </div>
  </MainLayout>
</template>
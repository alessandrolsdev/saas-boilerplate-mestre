<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import chargeService from '@/services/charges';
import clientService from '@/services/clients';
import BaseModal from '@/components/BaseModal.vue';

const charges = ref([]);
const clients = ref([]);
const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ description: '', value: '', due_date: '', client_id: '' });

const loadData = async () => {
  try {
    const [chargesData, clientsData] = await Promise.all([
      chargeService.getAll(),
      clientService.getAll()
    ]);
    charges.value = chargesData;
    clients.value = clientsData;
  } catch (error) { console.error(error); }
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const payload = { ...form.value, value: parseFloat(form.value.value), due_date: new Date(form.value.due_date).toISOString() };
    await chargeService.create(payload);
    await loadData();
    isModalOpen.value = false;
    form.value = { description: '', value: '', due_date: '', client_id: '' };
  } catch (error) { alert('Erro ao criar cobrança.'); } finally { isLoading.value = false; }
};

const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

// Mapa de cores para Tailwind (classes)
const statusClasses = {
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  PAID: 'bg-green-100 text-green-700 border-green-200',
  OVERDUE: 'bg-red-100 text-red-700 border-red-200',
  CANCELED: 'bg-slate-100 text-slate-700 border-slate-200'
};

onMounted(loadData);
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 class="text-2xl font-bold text-foreground">Lançamentos</h3>
          <p class="text-muted-foreground">Controle financeiro e cobranças</p>
        </div>
        <button 
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm" 
          @click="isModalOpen = true"
        >
          + Nova Cobrança
        </button>
      </header>

      <div class="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-secondary/50 text-muted-foreground border-b border-border">
              <tr>
                <th class="px-6 py-4 font-semibold">Descrição</th>
                <th class="px-6 py-4 font-semibold">Vencimento</th>
                <th class="px-6 py-4 font-semibold">Valor</th>
                <th class="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="charge in charges" :key="charge.id" class="hover:bg-secondary/20 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="font-medium text-foreground">{{ charge.description }}</span>
                    <span class="text-xs text-muted-foreground">Cliente #{{ charge.client_id }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">{{ formatDate(charge.due_date) }}</td>
                <td class="px-6 py-4 font-mono font-medium">{{ formatCurrency(charge.value) }}</td>
                <td class="px-6 py-4">
                  <span :class="`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusClasses[charge.status] || 'bg-gray-100'}`">
                    {{ charge.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="charges.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-muted-foreground">
                  <span class="text-4xl block mb-2 opacity-50">💰</span>
                  Nenhum lançamento registrado.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <BaseModal :isOpen="isModalOpen" title="Nova Cobrança" @close="isModalOpen = false">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Cliente</label>
            <select v-model="form.client_id" required class="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none">
              <option value="" disabled>Selecione...</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.full_name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Descrição</label>
            <input v-model="form.description" required placeholder="Ex: Honorários Mensais" class="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Valor (R$)</label>
              <input type="number" step="0.01" v-model="form.value" required placeholder="0,00" class="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Vencimento</label>
              <input type="date" v-model="form.due_date" required class="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none" />
            </div>
          </div>
          <button type="submit" :disabled="isLoading" class="w-full py-2.5 bg-accent text-accent-foreground font-bold rounded-lg hover:opacity-90 transition-opacity mt-2">
            {{ isLoading ? 'Lançando...' : 'Confirmar Lançamento' }}
          </button>
        </form>
      </BaseModal>
    </div>
  </MainLayout>
</template>
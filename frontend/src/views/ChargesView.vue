<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue'; // <--- Importando a Moldura
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
const getStatusColor = (status) => ({ PENDING: '#f59e0b', PAID: '#10b981', OVERDUE: '#ef4444', CANCELED: '#94a3b8' }[status] || '#cbd5e1');
const getStatusLabel = (status) => ({ PENDING: 'Pendente', PAID: 'Pago', OVERDUE: 'Atrasado', CANCELED: 'Cancelado' }[status] || status);

onMounted(loadData);
</script>

<template>
  <MainLayout>
    <div class="page-content">
      <header class="content-header">
        <div class="header-text">
          <h3>Lançamentos</h3>
          <p>Controle de entradas e cobranças</p>
        </div>
        <button class="btn-primary" @click="isModalOpen = true">
          + Nova Cobrança
        </button>
      </header>

      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="charge in charges" :key="charge.id">
              <td>
                <span class="desc-text">{{ charge.description }}</span>
                <span class="client-sub">Cliente ID: #{{ charge.client_id }}</span>
              </td>
              <td>{{ formatDate(charge.due_date) }}</td>
              <td class="font-mono">{{ formatCurrency(charge.value) }}</td>
              <td>
                <span class="status-badge" :style="{ backgroundColor: getStatusColor(charge.status) }">
                  {{ getStatusLabel(charge.status) }}
                </span>
              </td>
            </tr>
            <tr v-if="charges.length === 0">
              <td colspan="4" class="empty-state">
                <span class="icon">💰</span>
                <p>Nenhum lançamento registrado.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BaseModal :isOpen="isModalOpen" title="Nova Cobrança" @close="isModalOpen = false">
        <form @submit.prevent="handleSubmit" class="standard-form">
          <div class="form-group">
            <label>Cliente</label>
            <select v-model="form.client_id" required>
              <option value="" disabled>Selecione...</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.full_name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Descrição</label>
            <input v-model="form.description" required placeholder="Ex: Honorários Mensais" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Valor (R$)</label>
              <input type="number" step="0.01" v-model="form.value" required placeholder="0,00" />
            </div>
            <div class="form-group">
              <label>Vencimento</label>
              <input type="date" v-model="form.due_date" required />
            </div>
          </div>
          <button type="submit" class="btn-block" :disabled="isLoading">
            {{ isLoading ? 'Lançar' : 'Confirmar' }}
          </button>
        </form>
      </BaseModal>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
// Reutiliza estilos base (Idealmente estariam em components separados, mas aqui repetimos por agilidade)
.page-content { display: flex; flex-direction: column; gap: 1.5rem; }
.content-header { display: flex; justify-content: space-between; align-items: center; h3 { font-size: 1.1rem; color: $text-main; margin-bottom: 0.25rem; } p { font-size: 0.9rem; color: $text-muted; } }
.btn-primary { background: $primary-color; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: $radius-md; cursor: pointer; font-weight: 500; transition: background 0.2s; &:hover { background: $primary-hover; } }
.table-card { background: $bg-surface; border-radius: $radius-lg; border: 1px solid $border-color; box-shadow: $shadow-sm; overflow: hidden; table { width: 100%; border-collapse: collapse; th { background: $bg-app; padding: 1rem; text-align: left; font-size: 0.8rem; text-transform: uppercase; color: $text-muted; font-weight: 600; } td { padding: 1rem; border-top: 1px solid $border-color; color: $text-main; font-size: 0.95rem; } } }
.empty-state { text-align: center; padding: 3rem; color: $text-muted; .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; opacity: 0.5; } }
.font-mono { font-family: monospace; letter-spacing: -0.5px; font-weight: 600; }
.desc-text { display: block; font-weight: 500; }
.client-sub { display: block; font-size: 0.75rem; color: $text-muted; margin-top: 2px; }
.status-badge { padding: 0.2rem 0.6rem; border-radius: 99px; color: white; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

.standard-form {
  .form-group { margin-bottom: 1rem; }
  .form-row { display: flex; gap: 1rem; .form-group { flex: 1; } }
  label { display: block; margin-bottom: 0.4rem; font-size: 0.85rem; font-weight: 500; color: $text-main; }
  input, select { width: 100%; padding: 0.6rem; border: 1px solid $border-color; border-radius: $radius-md; outline: none; &:focus { border-color: $accent-color; } }
  .btn-block { width: 100%; padding: 0.75rem; background: $accent-color; color: white; border: none; border-radius: $radius-md; cursor: pointer; margin-top: 0.5rem; &:hover { background: $accent-hover; } }
}
</style>
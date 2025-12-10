# SaaS Mestre Boilerplate 🚀

> **Acelerador de Desenvolvimento SaaS com Arquitetura Sólida e Design Premium.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/python-3.10%2B-blue)](https://www.python.org/downloads/)
[![Vue Version](https://img.shields.io/badge/vue-3.x-green)](https://vuejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109%2B-009688)](https://fastapi.tiangolo.com/)

## 📋 Visão Geral

O **SaaS Mestre Boilerplate** é uma fundação robusta e escalável para o desenvolvimento de aplicações SaaS (Software as a Service). Projetado para eliminar o trabalho repetitivo de configuração inicial, ele oferece uma arquitetura moderna, segura e pronta para produção, combinando o poder do **FastAPI** no backend com a reatividade do **Vue 3** no frontend.

Este projeto adota padrões de engenharia de software corporativos, com foco em manutenção, escalabilidade e clareza de código.

---

## ✨ Funcionalidades Principais

### Backend (Python/FastAPI)
- **Autenticação Segura**: Implementação completa de OAuth2 com JWT (JSON Web Tokens) e hashing Bcrypt.
- **Arquitetura Clean**: Separação clara entre API, CRUD, Schemas, Models e Core.
- **SQLAlchemy ORM**: Abstração de banco de dados robusta com suporte futuro a migrações (Alembic).
- **Validação de Dados**: Pydantic V2 para garantia de integridade de dados.
- **Background Tasks**: Scheduler integrado (APScheduler) para tarefas recorrentes.
- **CORS Configurado**: Configuração de segurança pronta para comunicação frontend-backend.

### Frontend (Vue 3/Vite)
- **Design System Premium**: UI moderna construída com TailwindCSS.
- **State Management**: Gerenciamento de estado global com Pinia.
- **Roteamento Dinâmico**: Vue Router com guardas de navegação (Auth Guards).
- **Dashboards Interativos**: Integração com ApexCharts para visualização de dados financeiros.
- **API Client Centralizado**: Serviços modulares com interceptors para injeção automática de tokens.

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
saas-boilerplate-mestre/
├── backend/                # API RESTful com FastAPI
│   ├── app/
│   │   ├── api/            # Endpoints da API (v1)
│   │   ├── automations/    # Tarefas em background (Scheduler)
│   │   ├── core/           # Configurações globais e segurança
│   │   ├── crud/           # Camada de Acesso a Dados
│   │   ├── db/             # Configuração do Banco e Sessão
│   │   ├── models/         # Modelos SQLAlchemy (ORM)
│   │   └── schemas/        # Schemas Pydantic (DTOs)
│   ├── main.py             # Entrypoint da aplicação
│   └── seed.py             # Script de povoamento inicial
│
└── frontend/               # SPA com Vue 3
    ├── src/
    │   ├── components/     # Componentes Reutilizáveis
    │   ├── layouts/        # Layouts de Página
    │   ├── services/       # Integração com API
    │   ├── stores/         # Stores do Pinia
    │   └── views/          # Páginas da Aplicação
    └── index.html
```

---

## 🚀 Começando

### Pré-requisitos

- **Python 3.10+**
- **Node.js 18+**

### Instalação e Execução

#### 1. Backend

```bash
cd backend

# Crie e ative o ambiente virtual
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Inicialize o banco de dados com dados de teste
python seed.py

# Inicie o servidor
uvicorn main:app --reload
```
*O backend estará acessível em `http://127.0.0.1:8000`*

#### 2. Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
*O frontend estará acessível em `http://localhost:5173`*

---

## 📚 Documentação da API

A documentação interativa (Swagger UI) é gerada automaticamente e pode ser acessada em:

`http://127.0.0.1:8000/docs`

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**SaaS Mestre Team**

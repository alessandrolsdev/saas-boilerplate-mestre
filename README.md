# 🚀 Multi-SaaS Boilerplate Premium

> **Your All-in-One Solution for Scaling SaaS Businesses**

A production-ready, multi-tenant SaaS boilerplate designed to launch premium vertical SaaS solutions instantly. Built with modern technologies and best practices for scalability, security, and high conversion.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![Python](https://img.shields.io/badge/Backend-FastAPI-009688)
![Database](https://img.shields.io/badge/Database-SQLite%2FPostgres-336791)

---

## 🌟 Key Features

### 🏢 Multi-Vertical Architecture
Single codebase powering multiple specialized SaaS products:
- **💅 BeautyFlow**: Complete management for Beauty Salons & Spas.
- **🏋️ GymMaster**: Member & workout management for Gyms and Fitness Centers.
- **💼 FinanceFlow**: Recurring revenue & client management for B2B SaaS.
- **⚖️ LexFlow** (Coming Soon): Practice management for Law Firms.
- **🚜 TerraForce** (Coming Soon): Heavy equipment & construction management.

### 🎨 Premium "Top 1 Global" Design
- **Ultra-Modern UI/UX**: Distinct aesthetics for each vertical (Elegant Pink/Gold for Beauty, Brutalist Dark/Orange for Gym, Professional Blue/Green for Finance).
- **High-Conversion Landing Pages**: Specialized LPs for each niche with optimized copy and calls-to-action.
- **Responsive & Animated**: Smooth transitions, hover effects, and mobile-first design.

### 🛠️ Core Capabilities
- **Authentication**: Secure JWT-based auth with Role-Based Access Control (RBAC).
- **Multi-Tenancy**: Data isolation and management for multiple businesses.
- **Custom Dashboards**: Specialized views for each industry (Calendar for Salons, Check-ins for Gyms, MRR for Finance).
- **Interactive Components**: Real-time charts, kanban boards, and dynamic tables.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS + Lucide Icons + Shadcn/UI (concepts)
- **State Management**: React Query + Context API
- **Routing**: React Router v6

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Database**: SQLite (Dev) / PostgreSQL (Prod)
- **ORM**: SQLAlchemy + Alembic (Migrations)
- **Authentication**: PyJWT + Passlib

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/alessandrolsdev/saas-boilerplate-mestre.git
cd saas-boilerplate-mestre
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
# source venv/bin/activate

pip install -r requirements.txt
# Run migrations (ensure database is initialized)
# alembic upgrade head 

# Start Server
uvicorn main:app --reload
```
*Backend runs on: `http://localhost:8000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 📂 Project Structure

```
saas-boilerplate-mestre/
├── backend/            # FastAPI Application
│   ├── app/            # Core logic, models, schemas
│   ├── tests/          # Pytest suites
│   └── main.py         # Entry point
│
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Views for Landing Pages & Dashboards
│   │   │   ├── beauty/ # BeautyFlow specific pages
│   │   │   ├── gym/    # GymMaster specific pages
│   │   │   └── finance/# FinanceFlow specific pages
│   │   └── stores/     # State management
│
└── docker-compose.yml  # Deployment configuration
```

---

## 🐳 Deployment (Docker)

This project includes full Docker support for instant deployment.

```bash
# Build and start all services
docker-compose up -d --build
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ for SaaS Founders.**

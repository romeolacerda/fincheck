# 💰 Fincheck

**Fincheck** is a personal finance manager that allows users to register their bank accounts and manage the transactions of each one. It's designed to provide a simple and efficient way to keep track of your finances.

---

## 🧱 Tecnologias

### 🖥️ Frontend (Vite + React + Tailwind)
- **React 19** with **Vite** for fast development and builds
- **Tailwind CSS** for utility-first styling
- **React Hook Form** + **Zod** for form handling and schema validation
- **Radix UI** and **Headless UI** for accessible UI components
- **TanStack React Query** for API data fetching and caching
- **React Router** for routing
- **Axios**, **Date-fns**, and others for utilities

### 🛠️ API (NestJS + Prisma)
- **NestJS 11** as the main framework
- **Prisma ORM** for database access
- **PostgreSQL** as the database
- **JWT Authentication**
- **Docker** for containerization
- **Jest** for testing

## 🚀 How to run this project

### Make sure you have

- Node.js 22+
- Yarn
- Docker 

---

### 🧪 Backend (API)

```bash
cd api
cp .env.example .env
docker compose up -d
yarn prisma migrate deploy
yarn start:dev
```

The API will be running on: `http://localhost:3000`

---

### 🎨 Frontend (Web)

```bash
cd frontend
cp .env.example .env
yarn dev
```

Our frontend will be running on: `http://localhost:5173`

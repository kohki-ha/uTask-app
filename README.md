# 🚀 Utask 3.0

Sistema web de gerenciamento de tarefas no estilo **Kanban**, desenvolvido como parte da capacitação da **Unect (Empresa Júnior de Tecnologia da UTFPR)**.

---

## 📌 Sobre o projeto

O **Utask 3.0** é uma aplicação full-stack que permite organizar tarefas de forma visual e intuitiva, com foco em produtividade pessoal.

O sistema conta com autenticação de usuários, gerenciamento de tarefas e um quadro Kanban interativo.

---

## ✨ Funcionalidades

- 🔐 Cadastro e login de usuários
- 🌙 Alternância de tema (Dark Mode)
- 📝 Quadro de frases do dia
- 📋 Quadro Kanban com tarefas
- ✏️ Criação, edição e remoção de cards
- 🔄 Atualização de status das tarefas

---

## 🛠️ Tecnologias

### Frontend

- React (Vite)
- TypeScript

### Backend

- Node.js
- Fastify
- TypeORM

### Banco de dados

- PostgreSQL

### Autenticação

- JSON Web Token (JWT)
- Bcrypt

---

## ⚙️ Como executar o projeto

### Pré-requisitos

- Node.js
- Docker (opcional, recomendado)

---

### 🔹 Rodando com Docker (recomendado)

```bash
docker compose up --build
```

---

### 🔹 Rodando manualmente

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

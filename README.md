
# CRM Simplificado - Teste Técnico Fullstack

Este projeto é um sistema CRM simples com autenticação, controle de usuários, cadastro de clientes (customers) e registro de atendimentos. Faz parte de um teste técnico para a vaga de Desenvolvedor(a) Fullstack Pleno.

---

## 🧱 Estrutura do Projeto

O projeto está dividido em duas pastas principais:

- `frontend/` – Aplicação web construída com **Next.js** e **React**.
- `backend/` – API REST construída com **NestJS** e **Prisma ORM**.

---

## 🔐 Autenticação e Autorização

- Autenticação baseada em JWT.
- Rotas protegidas com `AuthGuard`, exceto a rota de login e a de cadastro de usuários no sistema.
- A Criação de clientes é protegida por roles: apenas usuários com `SELLER` ou `ADMINISTRATOR` podem acessar.
- Arquitetura de autenticação construída com:
  - `AuthModule`
  - `AuthController`
  - `AuthService`
  - `RoleService`
- Constante `JwtSecret` configurada em `src/auth`.

---

## 👥 Perfis de Usuário (Roles)

Os usuários são divididos em três perfis, definidos pelo enum:

```ts
enum Role {
  ATTENDANT
  SELLER
  ADMINISTRATOR
}
```

---

## 👤 Usuários de Teste (Seed Inicial)

O banco de dados já vem com três usuários pré-cadastrados, um para cada role:

| Nome       | Email                        | Senha   | Role           |
|------------|------------------------------|---------|----------------|
| Admin      | admin@admin.com              | 123456  | ADMINISTRATOR  |
| Atendente  | atentende@atendente.com      | 123456  | ATTENDANT      |
| Vendedor   | vendedor@vendedor.com        | 123456  | SELLER         |

---

## 📦 Backend – Estrutura de Pastas

Dentro de `backend/src/`, a estrutura segue este padrão:

- `/controller` – Controllers REST.
- `/service` – Lógica de negócios.
- `/module` – Módulos do NestJS.
- `/model`
  - `/dto` – Objetos de transferência de dados (Data Transfer Objects).

---

## 📋 Funcionalidades

- **Autenticação** com JWT
- **Criação e login de usuários**
- **Controle de permissões por role**
- **Cadastro de clientes (customers)** – restrito a SELLER e ADMINISTRATOR
- **Registro de atendimentos** – permitido para todos os usuários
- **Histórico de atendimentos vinculado ao cliente**
- **Formulário de cadastro de usuários acessível pela tela de login**

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- Npm

### 1. Clonar o repositório

```bash
git clone https://github.com/leandroteixeira97/teste-tracker.git
cd teste-tracker
```

### 2. Instalar dependências

**Backend**:

```bash
# a partir da raiz do repositório
cd backend
npm install
```

**Frontend**:

```bash
# a partir da raiz do repositório
cd frontend
npm install
```

### 3. Configurar variáveis de ambiente

O repositório já virá com as variáveis configuradas para rodar o projeto localmente.

### 4. Rodar as migrações e seed

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Iniciar o servidor
Abra dois bashs, onde um será responsável por rodar o `backend` e o outro, o `frontend`

```bash
# No bash dedicado ao backend
cd backend
npm run start:dev
```

```bash
# No bash dedicado ao frontend
cd frontend
npm run dev
```

---

## 📚 Tecnologias Utilizadas

### Backend
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [JWT](https://jwt.io/)

### Frontend
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)

---

## 📩 Contato

Caso tenha dúvidas ou sugestões, fique à vontade para entrar em contato.

---

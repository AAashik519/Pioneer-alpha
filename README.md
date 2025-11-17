# 🚀 Pioneer Alpha – Todo App

A modern Todo App built with **Next.js**, **TypeScript**, **ShadCN UI**, **Redux Toolkit**, and **RTK Query**.  
This application includes full **CRUD functionality**, **Drag & Drop todo reordering**, and a **Profile section** for updating user information.

---

## 📌 Features

### ✅ Todo Management

- Create todos
- Read/view todos
- Update todos
- Delete todos
- Search & filter tasks
- Set priority levels
- Set due dates
- Reorder todos using Drag & Drop

## 👤 Profile

- Update user information
- Upload/Change profile image
- Real-time API updates with RTK Query

---

## 👤 Backend API from:

- **https://todo-app.pioneeralpha.com/api/**

## 🧰 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Redux Toolkit**
- **RTK Query**
- **ShadCN UI**
- **Tailwind CSS**

### Installation & Setup

**Clone the repository**

```bash
git clone https://github.com/AAashik519/Pioneer-alpha.git
cd pioneer-alpha
```

**Install dependencies**

```bash
# Using npm

npm install

# Using yarn

yarn install

```

**Run the development server**

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Build the application

```bash
npm run build

```

# Project Structure

```bash
Pioneer-alpha/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── account/           # Account management page
│   │   │   └── page.tsx
│   │   ├── auth/              # Authentication routes
│   │   │   ├── login/         # Login page
│   │   │   └── signup/        # Signup page
│   │   ├── redux/             # Redux configuration
│   │   ├── favicon.ico
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── provider.tsx       # Redux provider
│   ├── components/            # Reusable components
│   │   ├── account/           # Account components
│   │   │   └── account-form.tsx
│   │   ├── auth/              # Authentication components
│   │   ├── layout/            # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── main-layout.tsx
│   │   │   └── sidebar.tsx
│   │   ├── TodoPage/          # Todo page components
│   │   │   └── TodoPage.tsx
│   │   ├── todos/             # Todo-related components
│   │   │   ├── add-task-model.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── task-card.tsx
│   │   │   ├── task-list.tsx
│   │   │   └── todo-nav.tsx
│   │   └── ui/                # ShadCN UI components
│   ├── lib/                   # Utility libraries
│   │   └── redux/             # Redux setup
│   ├── features/              # Redux features
│   │   ├── auth/              # Authentication slice
│   │   └── todos/             # Todos slice
│   │       └── todosAPI.ts    # RTK Query API for todos
│   └── services/              # Services
│       └── store.ts           # Redux store configuration
├── .gitignore
├── component.json            # ShadCN components configuration
└── package.json

```

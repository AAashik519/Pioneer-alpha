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
## 👤 Backend API  from:
  - **https://todo-app.pioneeralpha.com/api/**



## 🧰 Tech Stack
- **Next.js (App Router**
- **TypeScript**
- **Redux Toolkit**
- **RTK Query**
- **ShadCN UI**
- **Tailwind CSS**
 

---

## 📁 Project Structure

src/
│
├── app/
│   ├── account/
│   ├── auth/
│   ├── redux/
│   │   └── features/
│   │       ├── auth/
│   │       └── todos/
│   │           └── todosAPI.ts
│   ├── services/store.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── provider.tsx
│
├── components/
│   ├── account/
│   ├── auth/
│   ├── layout/
│   └── todos/
│       ├── add-task-modal.tsx
│       ├── empty-state.tsx
│       ├── task-card.tsx
│       ├── task-list.tsx
│       └── todo-nav.tsx
│
├── ui/
├── lib/
├── globals.css
├── config.ts
├── next-env.d.ts
└── eslint.config.mjs



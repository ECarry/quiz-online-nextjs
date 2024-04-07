# Next.js Full Stack Template 🚀

This is a project template for a full-stack application built with Next.js, including Prisma, MongoDB, AuthJS v5, Shadcn UI, and Tailwind CSS.

## Quick Start 🏃‍♂️

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses `next/font` to automatically optimize and load Inter, a custom Google Font.

## Technology Stack 💻

- **Next.js**: React framework for building fast, scalable applications.
- **Prisma**: Modern database tool for database operations and management.
- **MongoDB**: Flexible, scalable NoSQL database.
- **AuthJS v5**: JavaScript library for authentication and authorization.
- **Shadcn UI**: A simple, flexible UI component library.
- **Tailwind CSS**: Highly customizable CSS framework.

## Directory Structure 📂

```
.
├── README.md
├── app
│   ├── api
│   │   └── auth
│   │       └── [...nextauth]
│   │           └── route.ts
│   ├── client-example
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── auth.config.ts
├── auth.ts
├── components
│   ├── auth-components.tsx
│   ├── client-example.tsx
│   ├── custom-link.tsx
│   ├── header.tsx
│   ├── main-nav.tsx
│   ├── modals
│   │   └── test-modal.tsx
│   ├── mode-toggle.tsx
│   ├── providers
│   │   └── modal-provider.tsx
│   ├── session-data.tsx
│   ├── theme-provider.tsx
│   ├── ui
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── user-button.tsx
│   └── zustand-test.tsx
├── components.json
├── hooks
│   └── use-modal-store.ts
├── lib
│   ├── db.ts
│   └── utils.ts
├── middleware.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── prisma
│   └── schema.prisma
├── public
│   ├── next.svg
│   └── vercel.svg
├── tailwind.config.ts
└── tsconfig.json
```

## Contributing 🤝

Contributions are welcome! Check out the contributing guidelines to get started.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

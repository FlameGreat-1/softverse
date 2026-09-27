 This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



**Part 1: Core Database & Auth**
```bash
npm install @prisma/client next-auth bcryptjs @tiptap/react
```

**Part 2: TipTap Base Extensions**
```bash
npm install @tiptap/pm @tiptap/starter-kit @tiptap/extension-color @tiptap/extension-text-style
```

**Part 3: TipTap Rich Media Extensions**
```bash
npm install @tiptap/extension-link @tiptap/extension-image @tiptap/extension-youtube @tiptap/extension-underline
```

**Part 4: Forms & Utilities**
```bash
npm install @tiptap/extension-text-align date-fns react-hook-form zod
```

**Part 5: Frontend Rendering & CDN**
```bash
npm install @hookform/resolvers next-cloudinary @tailwindcss/typography
```

**Part 6: Developer Tools (Types & Prisma CLI)**
```bash
npm install -D prisma @types/bcryptjs
```

npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script > migration.sql


PostgreSQL (Prisma)
Next.js Edge Middleware Security (NextAuth)
Cloudinary Media Asset Pipeline
TipTap Advanced Headless Editor (with colors, highlights, and embeds)
Fully Automated Next.js SEO (Sitemap & OpenGraph)



npx prisma generate
npx prisma db push


npm i @tiptap/extension-superscript @tiptap/extension-subscript @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell @tiptap/extension-task-list @tiptap/extension-task-item


https://aistudio.google.com/app/api-keys
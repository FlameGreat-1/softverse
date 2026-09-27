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






WHICH COVERS THE SLIDES AS YOU CAN SEE IN THE IMAGES I SHARED

Fullstack Engineer
May 2022 — January 2024
[Autonoms AI](https://autonoms.ai/)
U.S.A|Full-time (Remote)
Contributed to the architecture and development of an AI workforce platform (React, Next.js, TypeScript) coordinating specialist outbound agents — research, enrichment, outreach, qualification, scheduling, and CRM hygiene — deployed across 147 enterprise clients
Engineered and maintained the agent deployment pipeline (Node.js, PostgreSQL) powering the custom multi-agent orchestration layer, integrating with email, LinkedIn, calendar/booking, and CRM APIs to support automated omni-channel outbound workflows
Built the marketplace storefront and seller/buyer portal with SSR via Next.js for SEO and sub-200ms page performance, supporting discovery and deployment of 120+ live AI agents with human-in-the-loop oversight; delivered on AWS with CI/CD automation, private cloud deployment, and isolated per-client infrastructure ensuring data sovereignty and 24/7 agent execution




HERE ARE MORE DETAILS:


Your AI workforce, hired!
Deploy in minutes. Talk to them. Watch them work.
Meet Jane, Marcus, Piper, Atlas and the rest of your AI workforce — deployed in your private cloud, trained on your business, and working across customer acquisition around the clock.


120+ AI employees live
Private cloud deployment
Human-supervised AI workforce
Outcome-based pricing



Built for the realities
of modern workforce operations



Customer acquisition that runs itself 24/7
Your AI workforce coordinates research, omni-channel outreach, qualification, follow-up, and automated CRM workflows as one unified system. Agents share context, avoid duplication, and keep customer acquisition moving continuously.



One AI team.
Every step of the sale.
From research to outreach to qualification to close — your AI team works as one system with a built-in CRM they update themselves. No manual logging. No handoff gaps. No dropped leads. Just booked meetings and closed deals.




Your private cloud. Your data. Yours alone.
Powered by OpenClaw orchestration and deployed in fully isolated infrastructure dedicated to your business. No shared environments. No co-mingled data. No 3rd party access. Your AI workforce runs in your cloud, trained on your data, and fully owned by you.


Self-improving AI teams that get smarter every day.
Your agents don’t just execute — they learn. Built-in routines optimize performance automatically. Agents communicate with each other to share context and avoid duplication. And every interaction makes the system sharper. Self-improving AI that compounds results over time.


AI teams.
Human supervisors.
One service.
We don’t just deploy your AI workforce — we staff it with human operators who supervise, correct, and optimize in real-time. AI scale. Managed accountability. One human-in-the-loop per team included at no extra cost.


Deploy across your entire org. Instantly.
Start with sales, then scale your AI workforce to marketing, customer service, recruiting, finance, and operations. Same platform. Same speed. New teams live in days, not months — without rebuilding, retraining, or starting over.


Inbox
Talk to your team.
Get answers instantly.
Everything your agents produce lands in a clean, filterable table. Prospect profiles, emails sent, meetings booked, all in one place, ready to export.


uilt for the way
real teams work.
Everything you need to ship AI workflows with confidence.

Set up in minutes, not weeks
Pick your agents, connect your tools, and launch. No engineers, no long onboarding.

A human is always one message away
Your dedicated Human Operator is on standby monitoring, intervening, and keeping things on track.

Full visibility into everything your AI does
We continuously monitor and optimize your automation to ensure it keeps delivering value.




Ah, I see. A massive `npm install` payload can definitely cause a network timeout depending on your connection or proxy settings. 

Let's break this down into smaller chunks of 4 packages at a time to ensure they install smoothly without timing out. Run these one by one:

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
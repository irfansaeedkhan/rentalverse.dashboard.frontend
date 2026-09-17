# Altaria Dashboard Frontend

Demo-ready Next.js App Router dashboard for portfolio balance, meta assets, rewards, affiliates, leaderboard, invoices, and rental miners.

## Tech stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Axios + Zustand
- ApexCharts, Stripe (demo stub), jsPDF

Package manager: **yarn**

## Scripts

```bash
yarn install
yarn dev
yarn build
yarn start
yarn lint
```

## Environment

Copy values from `.env.development` (safe for local demo):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_ENV` | `development` / `staging` / `production` |
| `NEXT_PUBLIC_DEMO_MODE` | `true` enables cookie auth bypass for demo tokens |

Do not commit secrets. `.env` is gitignored; `.env.development` may be committed when values are non-secret.

## Demo mode

With `NEXT_PUBLIC_DEMO_MODE=true`:

- API base URL is `/api/demo`
- Axios uses a local demo adapter (`utils/axios/demo-adapter.ts`)
- Fixtures live in `lib/demo-api.ts`
- Any login credentials work and set demo cookies

Login at `/auth/login` with any email/password (example: `demo@altaria.com` / `demo1234`).

## Folder structure

```
app/                 # routes (auth, dashboard, profile, settings)
components/          # UI by feature
constants/           # routes, networks, base URLs
lib/                 # auth API helpers + demo-api fixtures
stores/              # zustand auth store
utils/               # axios, middleware helpers, formatters
middleware.ts        # auth + route guards
```

## Priority demo screens

- `/dashboard` — balance, withdraw/deposit, rewards, transactions
- `/dashboard/affiliates` — referral rewards + affiliates list
- `/dashboard/leaderboard` — paginated ranks
- `/dashboard/notifications`
- `/dashboard/education`
- `/dashboard/chat-bot`
- `/dashboard/rental-miners`
- `/my-invoice` — invoices with download

## Notes

- Pagination page size is 5 for major tables
- Production build: `yarn build`
- Node 20.x recommended

# ExpenseTracker
Display the Total Expense, Add an expense with Category, Amount , and Description, and Delete an expenses from the list.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Expense Tracker

A full-stack expense tracking app built with **Next.js 14 App Router**, **TypeScript**, and **Supabase** — structured as a clean technical assessment submission.

## Features

- ➕ Add expenses with category, description, and amount
- 🗑️ Delete expenses with optimistic UI updates
- 💰 Live total summary at the top
- ✅ Client-side form validation (required fields, numeric amount, positive value)
- ⏳ Loading skeleton while fetching data
- 🔴 Error banner for network/DB failures
- 📭 Empty state when no expenses exist
- ♿ Accessible — ARIA roles, live regions, and labels throughout
- 🚀 Vercel-ready


## Tech Stack

| Layer      | Technology                   |
|------------|------------------------------|
| Framework  | Next.js 14 (App Router)      |
| Language   | TypeScript                   |
| Styling    | Vanilla CSS (design system)  |
| Database   | Supabase (PostgreSQL)        |
| Deployment | Vercel                       |



## Getting Started

### 1 — Clone the repository

```bash
git clone <your-repo-url>
cd expense-tracker
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** in the Supabase dashboard.
3. Paste and run the contents of [`schema.sql`](./schema.sql).
4. Copy your **Project URL** and **anon / public key** from  
   `Settings → API → Project API Keys`.

### 4 — Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ Never commit `.env.local` to version control.

### 5 — Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
expense-tracker/
├── schema.sql                  # Supabase SQL schema (run once)
├── .env.local.example          # Environment variable template
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Main page (state orchestration)
│   │   └── globals.css         # Design system (variables, components)
│   ├── components/
│   │   ├── ExpenseSummary.tsx  # Total spend card
│   │   ├── ExpenseForm.tsx     # Add expense form
│   │   ├── ExpenseList.tsx     # List with skeleton / empty state
│   │   └── ExpenseItem.tsx     # Single expense row
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client singleton
│   │   ├── expenses.ts         # fetchExpenses / createExpense / deleteExpense
│   │   ├── validation.ts       # Pure validation logic
│   │   └── categoryMeta.ts     # Category → icon / colour mapping
│   └── types/
│       └── expense.ts          # Shared TypeScript types
```

---

## Data Model

```sql
CREATE TABLE expenses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category    expense_category NOT NULL,
  amount      NUMERIC(12, 2)   NOT NULL CHECK (amount > 0),
  description TEXT             NOT NULL,
  created_at  TIMESTAMPTZ      NOT NULL DEFAULT now()
);
```

See [`schema.sql`](./schema.sql) for the full schema including enum, index, and RLS policies.

---

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
## Validation Rules

| Field       | Rules                                          |
|-------------|------------------------------------------------|
| Category    | Required — must be one of the predefined values |
| Description | Required — max 200 characters                  |
| Amount      | Required — numeric, finite, greater than zero   |

Validation runs on the client (instant feedback) and the logic is also importable for server-side use.

---

## Deployment to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push your repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add the two environment variables in the **Environment Variables** section:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
# Follow the prompts, then add env vars:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```

---

## Available Scripts

| Command          | Description                        |
|------------------|------------------------------------|
| `npm run dev`    | Start development server (port 3000) |
| `npm run build`  | Create production build            |
| `npm run start`  | Serve production build             |
| `npm run lint`   | Run ESLint                         |

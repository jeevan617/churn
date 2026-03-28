# ⚡ CHURN.AI — Predictive Churn Analysis Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?logo=sqlite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?logo=framer)

**A full-stack AI-powered customer churn prediction platform** built with Next.js, featuring 5 industry-specific ML models, complete user authentication, and a premium neon-cyber UI.

</div>

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [AI Models & Domains](#ai-models--domains)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Authentication System](#authentication-system)
8. [API Reference](#api-reference)
9. [UI & Design System](#ui--design-system)
10. [Pages Reference](#pages-reference)
11. [Troubleshooting](#troubleshooting)

---

## Overview

CHURN.AI is a full-stack **predictive churn analysis system** that uses logistic regression models calibrated on industry-specific datasets to estimate how likely a customer is to churn. After logging in, users can select from 5 business domains, enter customer parameters via an interactive form, and receive an instant churn score, risk classification, per-factor explainability breakdown, and an AI-generated retention recommendation.

---

## Features

### 🤖 AI Prediction Engine
- **5 independent logistic regression models** — Telecom, E-Commerce, Banking, SaaS, Gaming
- **Up to 13 parameters per model** — sliders, toggles, selectors, and numeric inputs
- **Explainability layer** — every prediction shows a ranked factor breakdown with impact bars (retentive vs. risk)
- **4 risk tiers** — `LOW`, `MODERATE`, `HIGH`, `CRITICAL` with color-coded glow effects
- **Contextual retention recommendations** per risk level

### 🎨 Premium UI / UX
- **Neon-cyber dark theme** with glassmorphism panels
- **Gradient text, ambient glow blobs, and grid overlays** on every page
- **SVG arc gauge chart** animates the churn score on every prediction
- **Interactive sliders** with gradient fill and custom thumb
- **Framer Motion microanimations** on page entry and elements
- **3D Spline cursor-reactive scene** on the homepage

### 🔐 Security & Auth
- **JWT-based session management** via HttpOnly cookies
- **bcrypt password hashing** (10 salt rounds)
- **Protected routes** — all dashboard & prediction pages redirect unauthenticated users to `/login`
- **Persistent sessions** — token stored in secure cookie, validated on every API call

### 💬 Direct-to-CEO Feedback
- **Secure message channel** from employees directly to the CEO
- **Stored safely** within a dedicated SQLite table
- **Executive inbox** with chronological views of employee sentiment

### 📊 Real-Time Database Analytics
- **Live dashboards** syncing predicted churn metrics directly from the SQL pipeline.
- **Dynamic distribution scale** visually mapping real-time predictions incrementally.

### 🗄️ Database
- **SQLite via `better-sqlite3`** — zero-config, file-based, auto-initialized
- **WAL journal mode** for improved concurrent read performance
- Database file (`churn.db`) auto-created on first request

---

## AI Models & Domains

All models are logistic regression classifiers using the sigmoid function:

```
P(churn) = sigmoid(β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ)
Churn Score = round(P(churn) × 100)
```

| Domain | Route | Parameters | Accuracy | Key Signals |
|--------|-------|-----------|----------|-------------|
| 📱 **Telecom** | `/predict/telecom` | 13 | 89.3% | Contract type, tenure, services bundle, data usage |
| 🛒 **E-Commerce** | `/predict/ecommerce` | 12 | 86.7% | RFM metrics, cart abandonment, loyalty program |
| 🏦 **Banking** | `/predict/banking` | 12 | 91.2% | Credit score, product portfolio, overdraft events |
| 🧩 **SaaS** | `/predict/saas` | 12 | 88.4% | NPS score, feature adoption, login recency, CSM |
| 🎮 **Gaming** | `/predict/gaming` | 12 | 84.9% | Session frequency, guild membership, IAP history |

### Risk Tier Classification

| Score | Tier | Color | Action |
|-------|------|-------|--------|
| 0–24 | `LOW` | 🟢 Green | Cross-sell; standard engagement |
| 25–49 | `MODERATE` | 🟡 Amber | Satisfaction survey; targeted outreach |
| 50–74 | `HIGH` | 🟠 Orange | Proactive campaign; discount offers |
| 75–100 | `CRITICAL` | 🔴 Red | Immediate intervention; priority retention package |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **3D Scene** | [Spline](https://spline.design/) (`@splinetool/react-spline`) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (SQLite) |
| **Auth: Hashing** | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Auth: Tokens** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) |
| **Runtime** | Node.js v24 |

---

## Project Structure

```
chrunprediction/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page (Spline 3D + hero)
│   │   ├── layout.tsx                # Root layout with Navbar
│   │   ├── globals.css               # Design system: tokens, glass, neon, scrollbar
│   │   │
│   │   ├── about/                    # About page
│   │   │   └── page.tsx
│   │   │
│   │   ├── devs/                     # Developers / team page
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/                    # Login page
│   │   │   └── page.tsx
│   │   │
│   │   ├── signup/                   # Signup page
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard/                # Post-login analytics dashboard
│   │   │   └── page.tsx
│   │   │
│   │   ├── predict/
│   │   │   ├── page.tsx              # Domain hub — choose your vertical
│   │   │   ├── telecom/page.tsx      # Telecom predictor (13 params)
│   │   │   ├── ecommerce/page.tsx    # E-Commerce predictor (12 params)
│   │   │   ├── banking/page.tsx      # Banking predictor (12 params)
│   │   │   ├── saas/page.tsx         # SaaS predictor (12 params)
│   │   │   └── gaming/page.tsx       # Gaming predictor (12 params)
│   │   │
│   │   ├── feedback/                 # Employee feedback submission form
│   │   │   └── page.tsx
│   │   │
│   │   ├── ceo/
│   │   │   └── feedback/             # Executive inbox for CEO feedback
│   │   │       └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── predict/
│   │       │   └── route.ts          # POST /api/predict — unified ML scoring API
│   │       ├── feedback/
│   │       │   └── route.ts          # GET/POST /api/feedback — feedback storage API
│   │       └── auth/
│   │           ├── register/route.ts # POST /api/auth/register
│   │           ├── login/route.ts    # POST /api/auth/login
│   │           ├── logout/route.ts   # POST /api/auth/logout
│   │           └── me/route.ts       # GET  /api/auth/me
│   │
│   ├── components/
│   │   ├── Navbar.tsx                # Top nav with auth-aware links
│   │   └── DomainPredictor.tsx       # Universal predictor widget (config-driven)
│   │
│   └── lib/
│       ├── db.ts                     # SQLite connection + table initialization
│       └── churnModels.ts            # All 5 logistic regression models + types
│
├── churn.db                          # Auto-generated SQLite database (gitignored)
├── package.json
├── next.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ (tested on v24.6.0)
- **npm** v8+

> ⚠️ **Important**: If you upgrade Node.js versions, run `npm rebuild better-sqlite3` (or delete `node_modules` and re-run `npm install`) to recompile the native SQLite binary for your current runtime.

### Installation

```bash
# 1. Clone / enter the project directory
cd chrunprediction

# 2. Install all dependencies (compiles better-sqlite3 for your Node version)
npm install

# 3. Start the development server
npm run dev
```

The app will be live at **http://localhost:3000**

> The SQLite database (`churn.db`) is automatically created with the correct schema on the first API request. No manual migration needed.

---

## Authentication System

CHURN.AI uses a fully custom, cookie-based JWT authentication system — no third-party auth provider required.

### Flow

```
Signup  →  POST /api/auth/register  →  bcrypt hash password  →  INSERT user → Set JWT cookie
Login   →  POST /api/auth/login     →  bcrypt compare         →  Sign JWT    → Set JWT cookie
Logout  →  POST /api/auth/logout    →  Clear JWT cookie
Me      →  GET  /api/auth/me        →  Verify JWT             →  Return user object
```

### How to Create an Account

1. Navigate to **http://localhost:3000/signup**
2. Enter your **Name**, **Email**, and **Password**
3. Click **GENERATE IDENTITY**
4. You'll be redirected to `/login` — enter your credentials
5. Click **AUTHENTICATE** — you're now logged in

### Default CEO Account

A dedicated CEO account is automatically generated upon database initialization to evaluate the executive feedback and dashboard statistics. Use these credentials to test the restricted views:
- **Email**: `ceo@churn.ai`
- **Password**: `admin`

### Protected Routes

All routes below require a valid JWT cookie and redirect to `/login` if unauthenticated:

- `/dashboard`
- `/predict` (and all sub-routes)

---

## API Reference

### `POST /api/auth/register`

Register a new user.

```json
// Request body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

// Response 200
{ "message": "User registered successfully" }

// Response 400
{ "error": "User with this email already exists" }
```

---

### `POST /api/auth/login`

Authenticate and receive a session cookie.

```json
// Request body
{ "email": "john@example.com", "password": "securepassword" }

// Response 200 — sets HttpOnly JWT cookie
{ "message": "Login successful" }

// Response 401
{ "error": "Invalid credentials" }
```

---

### `GET /api/auth/me`

Returns the currently authenticated user.

```json
// Response 200
{ "authenticated": true, "user": { "id": 1, "name": "John Doe", "email": "john@example.com" } }

// Response 401
{ "authenticated": false }
```

---

### `POST /api/feedback`

Submit direct employee feedback to the CEO.

```json
// Request body
{
  "employee_name": "John Doe",
  "message": "This is my feedback."
}

// Response 201
{ "message": "Feedback submitted successfully" }
```

---

### `GET /api/feedback`

Retrieve all employee feedback (executive inbox).

```json
// Response 200
{
  "feedbacks": [
    {
      "id": 1,
      "employee_name": "John Doe",
      "message": "This is my feedback.",
      "created_at": "2026-03-28 12:00:00"
    }
  ]
}
```

---

### `POST /api/predict`

Run a churn prediction for any domain. Requires authentication.

```json
// Request body — Telecom example
{
  "domain": "telecom",
  "tenure": 12,
  "monthlyCharges": 75,
  "totalCharges": 900,
  "numServices": 3,
  "monthlyGbUsage": 20,
  "contractType": "month-to-month",
  "paperlessBilling": true,
  "techSupport": false,
  "onlineSecurity": false,
  "seniorCitizen": false,
  "partner": false,
  "dependents": false
}

// Response 200
{
  "success": true,
  "score": 72,
  "probability": 0.724,
  "riskLevel": "HIGH",
  "factors": [
    { "name": "Contract Type",   "impact": 1.65, "direction": "negative" },
    { "name": "Tenure",          "impact": 0.50, "direction": "negative" },
    { "name": "Tech Support",    "impact": 0.48, "direction": "negative" },
    { "name": "Online Security", "impact": 0.39, "direction": "negative" },
    { "name": "Services Bundle", "impact": 0.54, "direction": "positive" },
    { "name": "Monthly Charges", "impact": 0.75, "direction": "negative" }
  ]
}
```

**Supported domains:** `telecom` | `ecommerce` | `banking` | `saas` | `gaming`

---

### Predict API — Parameter Reference

<details>
<summary><strong>📱 Telecom</strong> — 13 parameters</summary>

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `tenure` | number | 0–72 | Months as subscriber |
| `monthlyCharges` | number | 18–120 | Monthly bill ($) |
| `totalCharges` | number | 0+ | Total billed to date ($) |
| `numServices` | number | 0–8 | Bundled services count |
| `monthlyGbUsage` | number | 0–100 | Data usage (GB/month) |
| `contractType` | string | month-to-month / one-year / two-year | Contract duration |
| `paperlessBilling` | boolean | — | Uses paperless billing |
| `techSupport` | boolean | — | Has tech support add-on |
| `onlineSecurity` | boolean | — | Has online security |
| `seniorCitizen` | boolean | — | Senior citizen flag |
| `partner` | boolean | — | Has a partner |
| `dependents` | boolean | — | Has dependents |

</details>

<details>
<summary><strong>🛒 E-Commerce</strong> — 12 parameters</summary>

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `recencyDays` | number | 0–365 | Days since last purchase |
| `ordersPerMonth` | number | 0–20 | Average monthly orders |
| `avgOrderValue` | number | 10–500 | Average order value ($) |
| `lifetimeValue` | number | 0+ | Total lifetime spend ($) |
| `categoriesExplored` | number | 1–20 | Unique categories browsed |
| `cartAbandonmentRate` | number | 0–100 | Cart abandonment (%) |
| `returnRate` | number | 0–50 | Product return rate (%) |
| `emailOpenRate` | number | 0–100 | Marketing email open rate (%) |
| `reviewsPosted` | number | 0–50 | Reviews submitted |
| `supportTickets` | number | 0–20 | Support tickets raised |
| `loyaltyMember` | boolean | — | Enrolled in loyalty program |
| `hasMobileApp` | boolean | — | Uses the mobile app |

</details>

<details>
<summary><strong>🏦 Banking</strong> — 12 parameters</summary>

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `accountAge` | number | 0–120 | Account age in months |
| `monthlyTransactions` | number | 0–100 | Transactions per month |
| `avgBalance` | number | 0–50000 | Average account balance ($) |
| `creditScore` | number | 300–850 | Credit score |
| `productsCount` | number | 1–8 | Number of products held |
| `digitalLogins` | number | 0–60 | Digital logins per month |
| `overdraftIncidents` | number | 0–12 | Overdraft events in last year |
| `serviceCallsCount` | number | 0–10 | Support calls in last 6 months |
| `hasMobileApp` | boolean | — | Uses mobile banking app |
| `hasLoan` | boolean | — | Has active loan |
| `hasCreditCard` | boolean | — | Has credit card |
| `marketingOptIn` | boolean | — | Opted into marketing |

</details>

<details>
<summary><strong>🧩 SaaS</strong> — 12 parameters</summary>

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `subscriptionAge` | number | 1–60 | Subscription age in months |
| `planTier` | string | free / basic / pro / enterprise | Subscription tier |
| `monthlyActiveDays` | number | 0–31 | Active days per month |
| `featuresUsedPct` | number | 0–100 | Feature adoption (%) |
| `teamSize` | number | 1–500 | Number of seats / users |
| `lastLoginDaysAgo` | number | 0–90 | Days since last login |
| `apiCallsMonthly` | number | 0–100000 | API calls per month |
| `supportTickets` | number | 0–20 | Tickets raised |
| `npsScore` | number | 0–10 | Net Promoter Score |
| `hasIntegrations` | boolean | — | Has 3rd-party integrations |
| `hasSso` | boolean | — | SSO enabled |
| `hasDedicatedCsm` | boolean | — | Has dedicated CSM |

</details>

<details>
<summary><strong>🎮 Gaming</strong> — 12 parameters</summary>

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `accountAgeDays` | number | 0–1000 | Account age in days |
| `daysSinceLastLogin` | number | 0–180 | Days since last login |
| `sessionsPerWeek` | number | 0–28 | Average sessions per week |
| `avgSessionMinutes` | number | 0–180 | Average session length (min) |
| `totalSpend` | number | 0–500 | Total lifetime spend ($) |
| `friendsCount` | number | 0–200 | In-game friends |
| `achievementsCompletedPct` | number | 0–100 | Achievements earned (%) |
| `isGuildMember` | boolean | — | Member of a guild/clan |
| `hasMadeIap` | boolean | — | Has made in-app purchase |
| `usesVoiceChat` | boolean | — | Uses voice chat |
| `isPremium` | boolean | — | Premium/Battle Pass subscriber |
| `competitiveMode` | boolean | — | Plays competitive mode |

</details>

---

## UI & Design System

### CSS Variables (in `globals.css`)

```css
--color-neon-blue:    #00f0ff   /* Primary accent */
--color-neon-purple:  #b026ff   /* Secondary accent */
--color-neon-pink:    #ff007f   /* Tertiary accent */
--color-dark-surface: rgba(20,20,30,0.7)
--color-dark-border:  rgba(255,255,255,0.1)
```

### Utility Classes

| Class | Description |
|-------|-------------|
| `.glass-panel` | Frosted glass card with backdrop blur |
| `.text-gradient` | Neon blue → purple → pink gradient text |
| `.btn-neon` | Gradient button with hover glow and lift |
| `.input-neon` | Dark input with neon blue focus ring |

### Domain Color Palette

| Domain | Primary Color | Hex |
|--------|--------------|-----|
| Telecom | Cyan | `#00f0ff` |
| E-Commerce | Hot Pink | `#ff007f` |
| Banking | Amber | `#f59e0b` |
| SaaS | Purple | `#b026ff` |
| Gaming | Green | `#22c55e` |

---

## Pages Reference

| URL | Auth Required | Description |
|-----|:---:|-------------|
| `/` | No | Landing page with 3D Spline scene and hero section |
| `/about` | No | About the platform and its capabilities |
| `/devs` | No | Developers / team page |
| `/login` | No | Login form |
| `/signup` | No | Registration form |
| `/dashboard` | ✅ Yes | Analytics command center with live stats |
| `/predict` | ✅ Yes | Domain selection hub |
| `/predict/telecom` | ✅ Yes | Telecom churn predictor |
| `/predict/ecommerce` | ✅ Yes | E-Commerce churn predictor |
| `/predict/banking` | ✅ Yes | Banking churn predictor |
| `/predict/saas` | ✅ Yes | SaaS / Subscription churn predictor |
| `/predict/gaming` | ✅ Yes | Gaming churn predictor |
| `/feedback` | ✅ Yes | Submit direct feedback to the CEO |
| `/ceo/feedback` | ✅ CEO | Executive inbox to view employee feedback |

---

## Troubleshooting

### `ERR_DLOPEN_FAILED` — better-sqlite3 native module error

This occurs when `better-sqlite3` was compiled for a different Node.js version. Fix:

```bash
# Option 1 — Rebuild the native binary
npm rebuild better-sqlite3

# Option 2 — Fresh install (recommended after Node version upgrade)
rm -rf node_modules .next package-lock.json
npm install
```

### Multiple lockfile warning from Next.js

```
⚠ Warning: Next.js inferred your workspace root...
```

Delete any stray `package-lock.json` in your home directory:

```bash
rm ~/package-lock.json
```

### Port 3000 already in use

```bash
# Kill the process on port 3000
kill -9 $(lsof -t -i:3000)

# Or start on a different port
npm run dev -- -p 3001
```

---

## 📄 License

MIT License — free to use and modify.

---

<div align="center">
Built with ⚡ using Next.js, TypeScript, and a lot of neon.
</div>
 
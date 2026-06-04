# Veriseek AI — Meta Ads Report Generator

Live Meta Ads report generator for Veriseek AI. Pulls data directly from Meta Graph API. Token stored securely as a Vercel environment variable — never exposed in frontend code.

---

## Project Structure

```
veriseek-report/
├── api/
│   └── meta.js          ← Vercel serverless function (token lives here)
├── public/
│   └── index.html       ← Frontend report app
├── vercel.json          ← Vercel routing config
├── package.json
└── README.md
```

---

## Local Development

```bash
npm install -g vercel
vercel dev
```

Set your token locally:
```bash
export META_ACCESS_TOKEN=your_token_here
```

---

## Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Veriseek Meta Report"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/veriseek-report.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository** → select `veriseek-report`
3. Framework Preset: **Other**
4. Root Directory: leave as `/`
5. Click **Deploy**

### Step 3 — Add Environment Variable

1. Go to your Vercel project → **Settings → Environment Variables**
2. Add:
   - **Name:** `META_ACCESS_TOKEN`
   - **Value:** your Meta token (System User token recommended — never expires)
   - **Environment:** Production + Preview + Development
3. Click **Save**
4. Go to **Deployments** → click **Redeploy** (env vars need a redeploy to take effect)

---

## Getting a Permanent Meta Token

See the app's built-in Token Setup Guide, or:

**System User Token (never expires — recommended)**
1. [business.facebook.com/settings/system-users](https://business.facebook.com/settings/system-users)
2. Add System User → name: `Meraki Ads API` → Role: Admin
3. Add Assets → Apps → your Meta app → Manage App
4. Generate New Token → select permissions:
   - `ads_read`
   - `ads_management`
   - `business_management`
   - `read_insights`
5. Token Expiry: **Never** → Generate → copy immediately

6. Add the Veriseek ad account to the system user:
   Business Settings → Ad Accounts → Veriseek → Add People → select system user → Analyst role

---

## Meta Account

- **Client:** Veriseek AI
- **Account ID:** `3252000788333236`
- **Currency:** INR

---

## Permissions Required

| Permission | Purpose |
|---|---|
| `ads_read` | Read campaign data |
| `ads_management` | Access ad account |
| `business_management` | Business Manager access |
| `read_insights` | Performance metrics |

# KoinX - Tax Loss Harvesting Web Application

A production-ready, highly responsive **Tax Loss Harvesting** web application built for the KoinX Frontend Internship Assignment.

![Tax Loss Harvesting Interface](https://raw.githubusercontent.com/placeholder/screenshot.png)

---

## 🚀 Features

- 📊 **Real-time Capital Gains Calculation**: Compares **Pre-Harvesting** baseline capital gains against **After-Harvesting** live estimates as assets are selected.
- 💰 **Tax Savings Announcement**: Highlights exact tax savings (`You're going to save ₹X`) whenever loss harvesting reduces overall realised capital gains.
- ⚡ **Mock API Layer with Simulated Latency**: Real async API functions (`getHoldings` and `getCapitalGains`) with 500ms latency and loading skeleton UI.
- ⚠️ **Dev Error State Simulator**: Header toggle button to simulate server rejections, rendering an interactive error state with a retry mechanism.
- 🔍 **Search, Filter & Sorting**:
  - Filter by All Assets, Loss-Making Assets, or Profit-Making Assets.
  - Sort by STCG Impact (default), LTCG Impact, Asset Name (A-Z), or Total Balance.
- 📱 **Full Mobile Responsiveness**: Cards stack vertically and the table supports smooth horizontal scrolling on mobile screens.
- 🔄 **View All / Show Less Pagination**: Toggle between top 10 assets and full 25 portfolio holdings.
- ⚛️ **State Management via React Context**: Centralized `HarvestingProvider` preventing prop drilling.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom Inter Typography
- **Icons**: Lucide React
- **State Management**: React Context (`HarvestingContext`)

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd KoinX---Tax-Loss-Harvesting-Assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🧮 Business Logic & Mathematical Formulas

The app computes capital gains according to standard tax loss harvesting rules:

1. **Net Short-Term Capital Gains (STCG)** = `stcg.profits - stcg.losses`
2. **Net Long-Term Capital Gains (LTCG)** = `ltcg.profits - ltcg.losses`
3. **Realised Capital Gains** = `Net STCG + Net LTCG`

### 🔄 After-Harvesting Adjustment Logic

When a holding checkbox is checked in the table:
- If `stcg.gain > 0`, it adds `stcg.gain` to After-Harvesting `stcg.profits`.
- If `stcg.gain < 0`, it adds `Math.abs(stcg.gain)` to After-Harvesting `stcg.losses`.
- If `ltcg.gain > 0`, it adds `ltcg.gain` to After-Harvesting `ltcg.profits`.
- If `ltcg.gain < 0`, it adds `Math.abs(ltcg.gain)` to After-Harvesting `ltcg.losses`.

### 💡 Tax Savings Message
Displayed **only if** `preHarvestingRealisedGains > postHarvestingRealisedGains`:
$$\text{Tax Savings} = \text{Pre-Harvesting Realised Gains} - \text{Post-Harvesting Realised Gains}$$

---

## 📐 Worked Example Verification

- **Baseline Initial State**:
  - `stcg: { profits: 100, losses: 500 }` $\rightarrow$ Net STCG = $-400$
  - `ltcg: { profits: 1200, losses: 100 }` $\rightarrow$ Net LTCG = $1100$
  - **Realised Capital Gains** = $-400 + 1100 = 700$

- **Selecting ETH** (`stcg.gain = +500`, `ltcg.gain = -1000`):
  - Updated `stcg: { profits: 600, losses: 500 }` $\rightarrow$ Net STCG = $+100$
  - Updated `ltcg: { profits: 1200, losses: 1100 }` $\rightarrow$ Net LTCG = $+100$
  - **Updated Realised Capital Gains** = $100 + 100 = \mathbf{200}$
  - **Tax Savings** = $700 - 200 = \mathbf{500}$

*(This test case is automated in `src/utils/calculation.test.ts` and passes clean).*

---

## 📝 Key Assumptions & Design Choices

1. **Default Sorting Order**:
   - Holdings are sorted by **Absolute Short-Term Gain Descending** (`stcg_desc`) by default to draw immediate attention to high tax impact assets.
2. **Unique Row Keying**:
   - Because the mock dataset contains duplicate coin symbols (e.g. two separate `USDC` bridge holdings), row keys are indexed (`${coin}_${index}`) to maintain exact row selections.
3. **Currency & Micro Decimal Formatting**:
   - Formatted in Indian Rupee (`₹`). Micro crypto values (e.g. `0.0001462` or `5.04e-13`) are safely rendered without scientific notation clutter in table rows.

---

## 🚀 Deployment Instructions

### 1. Initialize Git Repository & Push to GitHub

Run these commands in your project root folder:

```bash
git init
git add .
git commit -m "Initial commit: Production-ready Tax Loss Harvesting React App"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/koinx-tax-loss-harvesting.git
git push -u origin main
```

### 2. Deploy to Vercel (CLI or Dashboard)

#### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy directly from terminal
vercel
```

#### Option B: Deploying via Vercel Web Dashboard
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository `koinx-tax-loss-harvesting`.
3. Keep default settings (`Vite` framework preset).
4. Click **Deploy**.

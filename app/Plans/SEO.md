# SEO Autopilot — Full-Stack AI SEO Platform
# Claude Code Build Prompt
# Inspired by: SEO.ai
# Codename: seo-autopilot

---

## Executive Summary

Build a production-grade, full-stack AI SEO automation platform that mirrors
the core functionality of SEO.ai. The product automates keyword research,
AI article generation, content gap analysis, CMS publishing, SEO analytics,
and internal linking — all from a single dashboard. This is a REAL working
product, not a marketing site.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│           Next.js 14 App Router (App Shell + Dashboard)     │
│                    seo-autopilot (Vercel)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP / REST
                           ▼
┌─────────────────────────────────────────────────────────────┐
│         MarketingBackend (Port 5002) — EXTEND THIS          │
│      https://geekquote-marketing.onrender.com               │
│                                                             │
│  New routes to add:                                         │
│  POST /api/seo/keyword-research                             │
│  POST /api/seo/content-gap                                  │
│  POST /api/seo/generate-article                             │
│  POST /api/seo/analyze-content                              │
│  POST /api/seo/meta-generate                                │
│  POST /api/seo/internal-links                               │
│  GET  /api/seo/analytics/:siteId                            │
│  POST /api/seo/publish/:platform                            │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Anthropic Claude API  │
              │  + Web Search Tool     │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Supabase PostgreSQL   │
              │  (via Prisma ORM)      │
              └────────────────────────┘
```

---

## PART 1: DATABASE SCHEMA (Prisma)

**File:** `prisma/schema.prisma` (in MarketingBackend)

Add these models to the existing schema:

```prisma
model Site {
  id            String   @id @default(cuid())
  userId        String
  name          String
  domain        String
  cmsType       String   // wordpress | webflow | wix | shopify | custom
  cmsApiKey     String?
  cmsSiteId     String?
  brandVoice    String?  // stored as JSON string
  language      String   @default("en")
  postFrequency String   @default("weekly") // daily | weekly | biweekly
  autoPublish   Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  articles        Article[]
  keywords        Keyword[]
  analytics       Analytics[]
  contentCalendar ContentCalendar[]
}

model Article {
  id               String    @id @default(cuid())
  siteId           String
  site             Site      @relation(fields: [siteId], references: [id])
  title            String
  slug             String
  content          String    @db.Text
  metaTitle        String?
  metaDescription  String?
  targetKeyword    String
  wordCount        Int       @default(0)
  seoScore         Int       @default(0)
  status           String    @default("draft") // draft | scheduled | published
  publishedAt      DateTime?
  cmsPostId        String?
  internalLinks    Json?     // array of {anchorText, targetUrl}
  featuredImageUrl String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
}

model Keyword {
  id           String   @id @default(cuid())
  siteId       String
  site         Site     @relation(fields: [siteId], references: [id])
  keyword      String
  searchVolume Int?
  difficulty   Int?     // 0-100
  intent       String?  // informational | commercial | transactional | navigational
  status       String   @default("discovered") // discovered | planned | published | gap
  topicCluster String?
  createdAt    DateTime @default(now())
}

model Analytics {
  id          String   @id @default(cuid())
  siteId      String
  site        Site     @relation(fields: [siteId], references: [id])
  date        DateTime
  clicks      Int      @default(0)
  impressions Int      @default(0)
  position    Float    @default(0)
  ctr         Float    @default(0)
  keyword     String?
  page        String?
  createdAt   DateTime @default(now())
}

model ContentCalendar {
  id          String   @id @default(cuid())
  siteId      String
  site        Site     @relation(fields: [siteId], references: [id])
  keyword     String
  scheduledAt DateTime
  status      String   @default("pending") // pending | generating | done
  articleId   String?
  createdAt   DateTime @default(now())
}
```

After adding models run:

```bash
npx prisma migrate dev --name add_seo_models
npx prisma generate
```

---

## PART 2: BACKEND — MarketingBackend Extensions

**Directory:** `src/routes/seo/`

Create a new router file: `src/routes/seo/seoRouter.ts`

Register it in `src/app.ts`:

```typescript
import seoRouter from './routes/seo/seoRouter';
app.use('/api/seo', seoRouter);
```

---

### 2.1 Keyword Research Endpoint

**POST /api/seo/keyword-research**

```typescript
// Input
{
  "topic": "coffee shops near me",
  "domain": "mycoffeeshop.com",
  "language": "en",
  "count": 20
}

// Output
{
  "keywords": [
    {
      "keyword": "best coffee shops delray beach",
      "estimatedVolume": "low|medium|high",
      "difficulty": 34,
      "intent": "informational",
      "topicCluster": "local discovery",
      "longTail": true,
      "suggestedTitle": "7 Best Coffee Shops in Delray Beach (2026 Guide)"
    }
  ]
}
```

Claude system prompt:

```
You are an expert SEO keyword researcher. Given a topic and domain,
generate ${count} keyword opportunities. For each keyword, assess:
- Search intent (informational/commercial/transactional/navigational)
- Estimated difficulty (0=easy, 100=impossible)
- Whether it's a long-tail opportunity
- A compelling article title for the keyword
- Topic cluster grouping for pillar/cluster strategy
Return ONLY valid JSON matching the schema. No markdown, no preamble.
```

Use Claude with `web_search` tool enabled. Persist results to the `Keyword` table for the given `siteId`.

---

### 2.2 Content Gap Analysis Endpoint

**POST /api/seo/content-gap**

```typescript
// Input
{
  "siteId": "clx123...",
  "domain": "mycoffeeshop.com",
  "existingPages": ["string array of current page titles/URLs"]
}
```

Processing:
1. Fetch existing keywords from DB for this `siteId`
2. Prompt Claude with web_search to identify gaps vs. what competitors cover
3. Return gap keywords not yet addressed by the site

Claude prompt:

```
You are an SEO content gap analyst. Given these existing pages:
[existingPages], identify the top keyword opportunities this site is
MISSING. Focus on: related long-tail variations, question keywords,
competitor topics, semantic clusters. Return JSON array of gap keywords
with difficulty scores and recommended content type (blog post, landing
page, FAQ, comparison).
```

---

### 2.3 Article Generation Endpoint

**POST /api/seo/generate-article**

This is the core feature. Use Claude with `web_search` enabled.

```typescript
// Input
{
  "siteId": "clx123...",
  "keyword": "best coffee shops delray beach",
  "brandVoice": "friendly, local expert, conversational",
  "targetWordCount": 1500,
  "language": "en",
  "internalUrls": ["/menu", "/contact", "/about"],
  "competitorContext": true
}
```

Multi-step Claude pipeline:

**Step 1 — Research:**
```
Search for the top 5 articles currently ranking for "${keyword}".
Identify: average word count, common H2 topics covered, semantic keywords
used, and content gaps. Return JSON only.
```

**Step 2 — Outline:**
```
Based on this research: ${research}
Create a comprehensive SEO article outline for "${keyword}" with:
- Compelling H1 title
- 5-7 H2 sections
- 2-3 H3 subsections each
- FAQ section (5 questions)
- CTA suggestion
Return JSON only.
```

**Step 3 — Write:**
```
Using this outline: ${outline}
Write the full SEO-optimized article in ${brandVoice} voice.
Target ${wordCount} words. Include these internal links naturally: ${internalUrls}.
Use markdown formatting. Return JSON with content field.
```

Claude system prompt for all steps:

```
You are an expert SEO content writer. You write articles that rank on Google
and satisfy real reader intent. You:
- Use the target keyword naturally (not stuffed)
- Include semantic/related keywords throughout
- Structure content with proper H1, H2, H3 hierarchy
- Write introductions that hook readers immediately
- Include numbered lists, comparison tables, and FAQs where appropriate
- End with a clear call-to-action
- Write in the specified brand voice
- Follow E-E-A-T principles
Output ONLY valid JSON:
{
  "title": "H1 title",
  "metaTitle": "60 char max SEO title",
  "metaDescription": "155 char max",
  "slug": "url-friendly-slug",
  "content": "full markdown article",
  "wordCount": number,
  "keywords": ["keyword", "used", "naturally"],
  "internalLinkSuggestions": [{"anchorText": "...", "targetUrl": "..."}],
  "seoScore": number
}
```

On completion, save the full result to the `Article` table with `status: "draft"`.

---

### 2.4 Content Analysis Endpoint

**POST /api/seo/analyze-content**

```typescript
// Input
{
  "content": "full article text",
  "targetKeyword": "coffee shops delray beach"
}

// Output
{
  "overallScore": 72,
  "wordCount": 1247,
  "targetWordCount": 1500,
  "keywordDensity": 1.2,
  "readabilityScore": 68,
  "missingKeywords": ["specialty coffee florida", "artisan espresso"],
  "recommendations": [
    "Add 250 more words to match competitor average",
    "Include an FAQ section targeting question keywords",
    "Add the keyword 'specialty coffee' 2 more times"
  ],
  "headingStructure": { "h1": 1, "h2": 4, "h3": 6 },
  "hasMetaDescription": true,
  "internalLinks": 2,
  "externalLinks": 1
}
```

This endpoint is called client-side on a 1-second debounce as the user edits
the article, providing real-time SEO feedback in the sidebar panel.

---

### 2.5 Internal Link Suggestions Endpoint

**POST /api/seo/internal-links**

```typescript
// Input
{
  "siteId": "clx123...",
  "articleContent": "...",
  "articleKeyword": "...",
  "allSitePages": [{ "title": "...", "url": "...", "keyword": "..." }]
}
```

Claude identifies natural anchor text opportunities in the article content and
maps them to existing site pages. Returns injection points with `{ anchorText, targetUrl, position }`.

---

### 2.6 WordPress Auto-Publish Endpoint

**POST /api/seo/publish/wordpress**

```typescript
// Input
{
  "articleId": "clx456...",
  "wpSiteUrl": "https://mycoffeeshop.com",
  "wpUsername": "admin",
  "wpAppPassword": "xxxx xxxx xxxx xxxx",
  "status": "publish" | "draft"
}
```

Implementation:
- Use WordPress REST API: `POST {wpSiteUrl}/wp-json/wp/v2/posts`
- Auth header: `Authorization: Basic base64(username:appPassword)`
- Body: `{ title, content, status, slug, meta: { _yoast_wpseo_metadesc } }`
- On success: update `Article` record with `cmsPostId` and `publishedAt`

---

### 2.7 SEO Analytics Endpoint

**GET /api/seo/analytics/:siteId**

Returns aggregated analytics from DB. For Phase 1, seed realistic mock data
on site creation (30 days of simulated growth curve). Phase 2 will replace
with real Google Search Console OAuth integration.

```typescript
// Output
{
  "summary": {
    "totalClicks": 1247,
    "totalImpressions": 48920,
    "avgPosition": 14.3,
    "avgCTR": 2.5
  },
  "topPages": [{ "url": "...", "clicks": 342, "impressions": 12400, "position": 8.2 }],
  "topKeywords": [{ "keyword": "...", "clicks": 98, "impressions": 3200, "position": 6.1 }],
  "trend": [{ "date": "2026-03-01", "clicks": 42, "impressions": 1840 }]
}
```

---

### 2.8 Environment Variables (MarketingBackend)

Add to `.env`:

```env
# Already exists:
ANTHROPIC_API_KEY=sk-ant-...

# Add:
DATABASE_URL=postgresql://...        # Supabase connection string (pooled)
DIRECT_URL=postgresql://...          # Supabase direct URL for migrations
```

---

## PART 3: FRONTEND — Next.js 14 App

### 3.1 Setup

```bash
npx create-next-app@14 seo-autopilot \
  --typescript --tailwind --eslint --app \
  --import-alias="@/*"
cd seo-autopilot

npx shadcn-ui@latest init
npx shadcn-ui@latest add button card badge tabs dialog sheet \
  accordion progress skeleton table textarea input label \
  select separator tooltip switch

npm install framer-motion lucide-react recharts zustand \
  @tanstack/react-query axios react-hook-form zod \
  @hookform/resolvers
```

---

### 3.2 App Directory Structure

```
app/
├── (marketing)/                    ← Public marketing pages
│   ├── page.tsx                    ← Landing page
│   ├── pricing/page.tsx
│   └── layout.tsx                  ← Navbar + Footer
│
├── (dashboard)/                    ← Protected product shell
│   ├── layout.tsx                  ← Sidebar + top bar
│   ├── dashboard/page.tsx          ← Overview + stats
│   ├── sites/
│   │   ├── page.tsx                ← All sites list
│   │   ├── new/page.tsx            ← Add site wizard
│   │   └── [siteId]/
│   │       ├── page.tsx            ← Site overview
│   │       ├── keywords/page.tsx   ← Keyword research hub
│   │       ├── articles/
│   │       │   ├── page.tsx        ← Article list
│   │       │   ├── new/page.tsx    ← Generate article wizard
│   │       │   └── [id]/page.tsx   ← Article editor
│   │       ├── calendar/page.tsx   ← Content calendar
│   │       ├── analytics/page.tsx  ← SEO analytics
│   │       └── settings/page.tsx   ← Site settings + CMS
│   └── account/page.tsx
│
├── api/
│   └── seo/
│       └── [...path]/route.ts      ← Thin proxy to MarketingBackend
│
├── components/
│   ├── marketing/                  ← Landing page section components
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── SiteSelector.tsx
│   │   ├── KeywordTable.tsx
│   │   ├── ArticleEditor.tsx
│   │   ├── ContentCalendar.tsx
│   │   ├── AnalyticsChart.tsx
│   │   ├── SEOScoreGauge.tsx
│   │   ├── GenerateArticleModal.tsx
│   │   └── PublishModal.tsx
│   └── shared/
│       ├── LoadingState.tsx
│       └── EmptyState.tsx
│
└── lib/
    ├── api.ts                      ← Axios instance → MarketingBackend
    ├── store.ts                    ← Zustand global store
    └── utils.ts
```

---

### 3.3 Environment Variables (Next.js)

**File:** `.env.local`

```env
MARKETING_BACKEND_URL=https://geekquote-marketing.onrender.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### 3.4 API Proxy Layer

**File:** `app/api/seo/[...path]/route.ts`

Thin proxy that forwards all `/api/seo/*` requests to MarketingBackend:

```typescript
const BACKEND = process.env.MARKETING_BACKEND_URL;

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const res = await fetch(`${BACKEND}/api/seo/${path}`);
  const data = await res.json();
  return Response.json(data, { status: res.status });
}

export async function POST(req: Request, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const body = await req.json();
  const res = await fetch(`${BACKEND}/api/seo/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
```

---

### 3.5 Zustand Global Store

**File:** `lib/store.ts`

```typescript
import { create } from 'zustand';

interface GenerationStep {
  label: string;
  status: 'pending' | 'running' | 'done' | 'error';
}

interface SEOStore {
  activeSiteId: string | null;
  setActiveSiteId: (id: string) => void;
  sites: any[];
  setSites: (sites: any[]) => void;
  generationSteps: GenerationStep[];
  setGenerationSteps: (steps: GenerationStep[]) => void;
  updateGenerationStep: (index: number, status: GenerationStep['status']) => void;
  keywords: any[];
  setKeywords: (kws: any[]) => void;
  analyticsData: any | null;
  setAnalyticsData: (data: any) => void;
}

export const useStore = create<SEOStore>((set) => ({
  activeSiteId: null,
  setActiveSiteId: (id) => set({ activeSiteId: id }),
  sites: [],
  setSites: (sites) => set({ sites }),
  generationSteps: [],
  setGenerationSteps: (steps) => set({ generationSteps: steps }),
  updateGenerationStep: (index, status) =>
    set((state) => {
      const steps = [...state.generationSteps];
      steps[index] = { ...steps[index], status };
      return { generationSteps: steps };
    }),
  keywords: [],
  setKeywords: (keywords) => set({ keywords }),
  analyticsData: null,
  setAnalyticsData: (analyticsData) => set({ analyticsData }),
}));
```

---

### 3.6 Dashboard Layout

**File:** `app/(dashboard)/layout.tsx`

Left sidebar + main content shell. Sidebar specs:

- Width: 240px, fixed left, full viewport height
- Background: `#0f172a` (dark slate), white text
- Active nav item: left blue border `border-l-2 border-blue-500` + slightly
  lighter background
- Collapses to icon-only rail on mobile (hamburger trigger)

**Sidebar content (top to bottom):**

```
[Logo] SEO Autopilot          ← bold, white

[Site Selector Dropdown]      ← shows all user sites, "+ Add Site" option

─── Navigation ───
📊  Dashboard
🔍  Keywords
✍️   Articles
📅  Calendar
📈  Analytics
⚙️   Settings

─── Bottom ───
👤  Account
❓  Help
```

---

### 3.7 Dashboard Overview Page

**File:** `app/(dashboard)/dashboard/page.tsx`

**Top row — 4 metric stat cards:**

| Metric | Icon | Accent color |
|--------|------|-------------|
| Articles Published | FileText | Blue |
| Total Clicks (30d) | MousePointer | Green |
| Avg. Position | TrendingUp | Purple |
| Keywords Tracked | Search | Orange |

Each card: muted label, large number, small percentage change badge vs. prior period.

**Middle row — 2 columns:**
- Left (60%): Recharts `AreaChart` — clicks + impressions over last 30 days,
  dual Y-axis, blue and green fills with 30% opacity
- Right (40%): Recent articles list — title, status badge, relative timestamp,
  "Edit" link

**Bottom row — 2 columns:**
- Left: Mini content calendar — next 7 days, show scheduled article titles
- Right: Top performing keywords table — keyword, clicks, avg. position

---

### 3.8 Keyword Research Hub

**File:** `app/(dashboard)/[siteId]/keywords/page.tsx`

**Page header:**
- "Keywords" heading
- "Research Keywords" primary button → opens Research Modal
- Search input to filter table
- "Export CSV" ghost button

**Research Modal (`GenerateKeywordsModal.tsx`):**

```
Topic or seed keyword:   [________________________]
Language:                [English            ▼]
Number of results:       [20                 ▼]

[🔍 Research Keywords]
```

On submit → `POST /api/seo/keyword-research` → results stream into table below.
Show skeleton rows during loading (one per expected result).

**Keyword Table columns:**

| Column | Notes |
|--------|-------|
| Keyword | Full text, copyable |
| Est. Volume | low / medium / high badge |
| Difficulty | 0-100 colored progress bar: green ≤33, amber ≤66, red >66 |
| Intent | colored badge: blue=informational, orange=commercial, green=transactional |
| Cluster | topic cluster label |
| Status | discovered / planned / published |
| Action | "Generate Article" button → prefills article generator |

**Tabs at top of page:**
- **Discovered** — all researched keywords
- **Content Gaps** — keywords missing from site (triggers `/api/seo/content-gap`)
- **Planned** — keywords with scheduled articles
- **Published** — keywords with published articles

---

### 3.9 Article Generator Wizard

**File:** `app/(dashboard)/[siteId]/articles/new/page.tsx`

Three-step wizard with progress indicator at top.

**Step 1 — Configuration:**

```
Target Keyword:       [________________________]
Brand Voice:          [Friendly, Expert, Local ▼]   (from site settings or freetext)
Target Word Count:    [1000]  [1500]  [2000]  [2500]   ← segmented control
Language:             [English ▼]
Auto-insert internal links:  [toggle ON]
Enable web research:         [toggle ON]

[Generate Article →]
```

Validation: keyword required, min 3 chars. Zod + react-hook-form.

**Step 2 — Generation Progress:**

Animated live progress checklist. Poll backend every 2 seconds or use SSE.
Each item checks off when its step completes:

```
[✓] Researching top-ranking competitors...
[✓] Identifying keyword opportunities...
[⟳] Writing article outline...                ← pulsing spinner
[ ] Writing full content...
[ ] Optimizing for SEO...
[ ] Generating meta tags...
[ ] Calculating SEO score...
```

Show estimated time remaining. On error, show which step failed with retry button.

**Step 3 — Article Editor:**

Split-pane layout, no page scroll — fixed height viewport:

- **Left pane (65%):** Markdown editor
  - Toolbar: Bold, Italic, H2, H3, Link, Blockquote, Ordered List, Unordered List
  - Full article content auto-loaded
  - Character/word count in footer
  - Auto-save indicator ("Saving..." / "Saved")

- **Right pane (35%):** SEO Sidebar

```
SEO Score
[████████░░]  78 / 100

Word Count
[████████░░░░]  1,247 / 1,500

✓  Meta title: 58 chars (good)
✓  Meta description: 152 chars (good)
✓  H1 found: 1
✓  H2 headings: 5
⚠  Keyword density: 0.8% (aim for 1–2%)
✗  FAQ section: missing

Missing Keywords
• "specialty coffee"      → add 2×
• "miami beach cafes"     → add 1×
• "artisan espresso"      → add 1×

Internal Links: 3 inserted

─────────────────────────────
[📋 Copy Markdown]
[📄 Copy HTML]
[💾 Save Draft]
[🚀 Publish to WordPress →]
```

SEO score recalculates on a 1-second debounce after each keystroke via
`POST /api/seo/analyze-content`. Missing keyword chips are clickable —
clicking one scrolls to the first occurrence in the editor and highlights it.

---

### 3.10 Article List Page

**File:** `app/(dashboard)/[siteId]/articles/page.tsx`

**Header:** "Articles" + "Generate New Article" button

**Filter bar:** Status tabs (All / Draft / Scheduled / Published) + search input

**Article table columns:**

| Column | Notes |
|--------|-------|
| Title | Clickable → opens editor |
| Target Keyword | Tag style |
| SEO Score | Colored badge: red <50, amber 50-74, green ≥75 |
| Word Count | Plain number |
| Status | Draft / Scheduled / Published badge |
| Published Date | Relative or absolute |
| Actions | Edit, Publish, Delete |

Empty state: illustration + "Generate your first article" CTA button.

---

### 3.11 Content Calendar

**File:** `app/(dashboard)/[siteId]/calendar/page.tsx`

**Layout:** Full monthly grid built with CSS Grid (no external calendar library).

Each day cell (`min-height: 100px`):
- Day number top-right
- Article cards stacked inside cell:
  - Title (truncated to 2 lines)
  - Status badge (color-coded)
  - Click → opens article editor in modal or navigates to editor

**Right panel (300px):**
- Month navigation (prev/next arrows)
- "Schedule Article" button → opens modal to pick date + select draft article
- Posting frequency indicator: "3 articles scheduled this week"

**Below calendar — List view:**
Toggle between grid and list. List shows: Date | Title | Keyword | Status | Actions

---

### 3.12 Analytics Dashboard

**File:** `app/(dashboard)/[siteId]/analytics/page.tsx`

**Date range selector:** Last 7d / 30d / 90d / Custom date picker

**Top row — 4 metric cards:**
Total Clicks | Total Impressions | Avg. Position | Avg. CTR

All show delta vs. previous period (green up arrow / red down arrow).

**Chart row 1:**
Full-width Recharts `ComposedChart` — clicks as `Area`, impressions as `Line`
on dual Y-axis. X-axis: dates. Tooltip shows both values on hover.

**Chart row 2 — 2 columns:**
- Left: Horizontal `BarChart` — Top 10 pages by clicks
- Right: Horizontal `BarChart` — Top 10 keywords by impressions

**Tables:**
- Tab 1 — Top Pages: URL | Clicks | Impressions | Position | CTR
- Tab 2 — Top Keywords: Keyword | Clicks | Impressions | Position | CTR

All charts use: primary blue `#0052ff` (clicks), success green `#10b981` (impressions).

---

### 3.13 Site Settings

**File:** `app/(dashboard)/[siteId]/settings/page.tsx`

Four tabs:

**Tab 1 — General:**
- Site name input
- Domain input (read-only after creation)
- Language selector (50+ options)
- Timezone selector

**Tab 2 — CMS Integration:**

```
Connect Your CMS

[WordPress]  [Webflow]  [Wix]  [Shopify]  [Custom API]
   ↑ card grid, click to expand credentials form

─── WordPress ───────────────────────────────────────────
Site URL:            [https://mycoffeeshop.com          ]
Username:            [admin                              ]
Application Password:[•••••••••••••••••••••••••••••      ]
  ℹ️ Generate in WP Admin → Users → Application Passwords

[Test Connection]    [Save]

Status: ✓ Connected  (last tested 2 minutes ago)
```

**Tab 3 — Brand Voice:**

```
Describe your brand voice:
┌──────────────────────────────────────────────────────┐
│ Friendly, knowledgeable local expert. We write like  │
│ we're talking to a neighbor. Never salesy, always    │
│ helpful.                                             │
└──────────────────────────────────────────────────────┘

Tone:      Casual ──●────── Professional
Formality: Informal ────●── Formal

[Save Brand Voice]
[🧠 Analyze my existing content]   ← crawls site, infers voice via Claude
```

**Tab 4 — Publishing:**
- Auto-publish toggle
- Post frequency: Daily / 3× week / Weekly / Biweekly (segmented control)
- Default publish status: Draft / Published
- Email notification before publishing (toggle)
- Approval window: "Send email X hours before publishing" (number input)

---

### 3.14 Add New Site Wizard

**File:** `app/(dashboard)/sites/new/page.tsx`

4-step wizard with progress bar (`Step 1 of 4`):

**Step 1 — Site Info:**
- Site name (e.g. "My Coffee Shop")
- Domain (https://...)
- Primary language selector
- Primary industry/niche (helps Claude generate better keywords)

**Step 2 — CMS Connection:**
- Card grid: WordPress | Webflow | Wix | Squarespace | Shopify | Custom API | Skip for now
- On selection: show credential form
- "Test Connection" button — must pass before proceeding (or allow skip)

**Step 3 — Brand Setup:**
- Brand voice textarea (pre-filled with sensible default based on industry)
- Tone + formality sliders
- Brand color (hex input — for future AI image generation)
- Post frequency preference

**Step 4 — Launch:**
- Trigger first keyword research automatically (`POST /api/seo/keyword-research`)
  using the site's domain + niche as the topic
- Show live keyword discovery animation as results arrive
- Display first 8 keywords with "Add to Calendar" checkboxes
- "Schedule First 4 Articles" button → creates `ContentCalendar` records
- "Go to Dashboard" → redirects to `/sites/[newSiteId]`

---

### 3.15 Marketing Landing Page

**File:** `app/(marketing)/page.tsx`

Build the full SEO.ai-inspired public landing page with these sections in order.
Use Framer Motion scroll-reveal on all section headings and cards:

```typescript
// Reusable scroll reveal wrapper
const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);
```

**Section order:**

1. **Navbar** — Logo left, nav links center, "Sign In" ghost + "Start Free Trial" solid blue right. Sticky with `backdrop-blur`.

2. **Hero** — Badge pill "Ranked #1 for AI SEO", large H1 "SEO on autopilot for small businesses", subheadline, "Start for $1" CTA, 3 trust signals with green checkmarks (14-day money back / Setup in 10 min / Human support). Right side: styled dashboard mockup SVG.

3. **Problem** — "Focus on your business. AI handles your SEO." Three paragraphs building the pain → solution narrative.

4. **Process** — "the process" label, 3-card horizontal flow: Research → Write → Publish. Below: feature pill grid (15 pills: Auto Images, Internal Linking, Auto Publishing, Brand Voices, +50 Languages, Auto Research, SEO Benchmarking, Content Calendar, Meta Data, SEO Analytics, CMS Integrations, AI Article Editor, Custom Instructions, AI Memory, SEO Benchmarking).

5. **Testimonials** — 3 customer story cards. Generate 6 realistic fictional testimonials from varied industries (restaurant, e-commerce, dental, real estate, gym, consulting). Avatar initials circle, 5 stars, 2-3 sentence quote.

6. **Pricing** — Monthly/Annual toggle (annual = 25% off). Two cards side by side:
   - Single Site: $149/mo — 1 site
   - Multi Site: $299/mo — up to 3 sites, interactive slider (1/3/5/10/+10), updates price
   - Feature checklist on both cards

7. **Content Quality** — 2-column: left = 9-item bullet list of SEO principles with bold labels; right = mock article preview card.

8. **Auto-Publish** — CMS logo badge grid: WordPress, Webflow, Wix, Squarespace, Shopify, Magento, Custom API.

9. **Control Features** — 6-card grid: Content Calendar, Brand Voices, SEO Analytics, Keyword Research, AI Memory, Posting Frequency (+ 2 more: SEO Benchmarking, AI Writer).

10. **FAQ** — shadcn `Accordion` component, 7 items, single-open mode.

11. **Final CTA** — Blue background section, large headline, "Start for $1 →" button, italic subtext.

12. **Footer** — 5-column link grid + bottom bar with copyright.

---

## PART 4: DESIGN SYSTEM

### Brand Color Palette

```css
/* globals.css */
:root {
  --color-primary:      #0052ff;    /* Primary blue — CTAs */
  --color-primary-dark: #003ecc;    /* Hover state */
  --color-text:         #1a1a2e;    /* Near-black body */
  --color-text-muted:   #6b7280;    /* Muted gray */
  --color-bg:           #ffffff;    /* Page background */
  --color-bg-soft:      #f8fafc;    /* Alternate section bg */
  --color-border:       #e5e7eb;    /* Subtle borders */
  --color-success:      #10b981;    /* Green: checkmarks, positive stats */
  --color-warning:      #f59e0b;    /* Amber: medium difficulty */
  --color-danger:       #ef4444;    /* Red: high difficulty, errors */
  --color-sidebar:      #0f172a;    /* Dark sidebar bg */
}
```

### Typography

- **Display headings:** `font-weight: 700`, `tracking-tight`, `text-4xl` to `text-6xl`
- **Section headings:** `font-weight: 700`, `text-3xl`
- **Card headings:** `font-weight: 600`, `text-xl`
- **Body:** `font-size: 1rem`, `line-height: 1.7`, `color: var(--color-text-muted)`
- **Labels/badges:** `font-size: 0.75rem`, `font-weight: 500`, uppercase optional

### Spacing

Sections: `py-20 md:py-28` | Container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`

### Responsive Breakpoints

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| default | <768px | 1-column, stacked |
| `md:` | ≥768px | 2-column grids |
| `lg:` | ≥1024px | 3-column grids, full sidebar |
| `xl:` | ≥1280px | max container width |

---

## PART 5: CLAUDE API CONFIGURATION

All SEO backend routes use this Claude configuration:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const response = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 4096,
  tools: [
    {
      type: 'web_search_20250305',
      name: 'web_search',
    }
  ],
  system: SYSTEM_PROMPT,
  messages: [{ role: 'user', content: userPrompt }],
});

// Extract text from response
const text = response.content
  .filter(block => block.type === 'text')
  .map(block => block.text)
  .join('');

// Strip markdown fences if present, then parse JSON
const clean = text.replace(/```json\n?|```\n?/g, '').trim();
const parsed = JSON.parse(clean);
```

Always wrap in try/catch. On JSON parse failure, return a structured error
response: `{ success: false, error: 'Generation failed', details: err.message }`.

---

## PART 6: IMPLEMENTATION SEQUENCE

Build strictly in this order. Each checkpoint produces working, testable software.

### Checkpoint 1 — Backend Foundation
- [ ] Add all 5 Prisma models to schema
- [ ] Run `prisma migrate dev --name add_seo_models`
- [ ] Scaffold `seoRouter.ts` with all 7 route stubs returning mock `200` responses
- [ ] Register router in `app.ts`
- [ ] Test all routes return correct mock shapes via curl or Postman

### Checkpoint 2 — Keyword Research (End-to-End)
- [ ] Implement `/api/seo/keyword-research` with real Claude + web_search call
- [ ] Persist results to `Keyword` table
- [ ] Scaffold Next.js app, install all dependencies
- [ ] Build Keywords page + Research Modal
- [ ] Connect frontend to backend, render results in table with skeleton loading

### Checkpoint 3 — Article Generation (End-to-End)
- [ ] Implement `/api/seo/generate-article` — full 3-step Claude pipeline
- [ ] Implement `/api/seo/analyze-content` — scoring + recommendations
- [ ] Build article generator wizard (Steps 1, 2, 3)
- [ ] Build split-pane article editor with SEO sidebar
- [ ] Wire debounced real-time SEO score updates

### Checkpoint 4 — Dashboard Shell
- [ ] Build dashboard layout with dark sidebar + responsive collapse
- [ ] Build site selector dropdown in sidebar
- [ ] Build site management pages (list + Add New Site wizard)
- [ ] Build dashboard overview page with Recharts charts

### Checkpoint 5 — Publishing
- [ ] Implement WordPress publish endpoint with WP REST API
- [ ] Build Publish Modal in article editor
- [ ] Build CMS Integration tab in site settings
- [ ] "Test Connection" button with live feedback

### Checkpoint 6 — Analytics + Calendar
- [ ] Implement `/api/seo/analytics/:siteId` — seed mock data on site creation
- [ ] Build analytics dashboard with all Recharts charts
- [ ] Build content calendar grid
- [ ] Schedule article modal + content calendar DB integration

### Checkpoint 7 — Polish + Marketing Site
- [ ] Build full marketing landing page (all 12 sections)
- [ ] Add Framer Motion scroll-reveal animations throughout
- [ ] Loading skeletons on all async data fetches
- [ ] Error boundaries + empty states on all pages
- [ ] Full responsive audit at 375px, 768px, 1280px, 1440px

---

## PART 7: QUALITY CHECKLIST

### Backend
- [ ] All 7 SEO routes respond with correct data shapes
- [ ] Prisma migrations run cleanly against Supabase
- [ ] All Claude calls use `web_search` tool
- [ ] Article generation produces real 1,000+ word articles
- [ ] WordPress publish endpoint tested against a live WP installation
- [ ] Zero API keys in source code — all via environment variables
- [ ] All routes return consistent `{ success: boolean, data?: any, error?: string }` envelope

### Frontend
- [ ] TypeScript strict mode — zero `any` types in new files
- [ ] `next build` produces zero errors and zero warnings
- [ ] All forms validated with Zod + react-hook-form
- [ ] Every async operation has loading state (skeleton or spinner)
- [ ] Every error state handled gracefully (toast notification)
- [ ] Recharts `ResponsiveContainer` wraps all charts
- [ ] Dark sidebar + light content area passes WCAG AA contrast

### Feature Completeness
- [ ] Can add a new site end-to-end (wizard → first keywords discovered)
- [ ] Can research 20 keywords for any topic
- [ ] Can generate a 1,500-word SEO article from a keyword
- [ ] Article editor shows live SEO score that updates on typing
- [ ] Can publish an article to WordPress (draft or live)
- [ ] Analytics page renders charts with data
- [ ] Content calendar shows scheduled articles by date

---

## PART 8: FUTURE PHASES (DOCUMENT ONLY — DO NOT BUILD NOW)

| Phase | Feature |
|-------|---------|
| 2 | Google Search Console OAuth — real analytics data |
| 3 | AI image generation via Replicate (brand reference images → AI visuals) |
| 4 | Stripe billing — $149/mo Single Site, $299/mo Multi Site plans |
| 5 | Multi-tenant auth (NextAuth → Supabase Auth, user isolation) |
| 6 | Backlink exchange network — partner site outreach automation |
| 7 | Webflow, Shopify, Wix CMS adapter modules |
| 8 | Brand voice AI training — crawl existing site content, infer voice |
| 9 | White-label agency mode — client sub-accounts |
| 10 | GeekRadar integration — scrape restaurant leads for GetOrderStack cross-sell |
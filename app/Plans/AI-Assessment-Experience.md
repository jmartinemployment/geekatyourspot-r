# AI Assessment Experience Plan

## Objective
Build a high-end, 4-stage interactive "Contact" page that doubles as an AI solution demo.

## Brand Identity
- **Primary Navy:** `#023059`
- **Primary Accent:** `#8C2703` (Rust/Orange)
- **Backgrounds:** Deep Navy or Zinc-900 (Dark Mode feel)
- **Typography:** Sora (Found in existing code) for headings, Geist Mono for logs.

## 1. Infrastructure & API Logic
### `lib/google-calendar.ts`
- Utility for Google Calendar Service Account integration.
- Methods: `getCalendarAvailability` (freebusy query) and `listEvents`.
- Handles timezone conversion to ET (Eastern Time).

### `app/api/qualify-agent/route.ts`
- Next.js Edge/Node streaming route using Anthropic SDK.
- **Agent Roles:**
  - Collector: Gathers Business Type, Pain Point, AI Experience, Email.
  - Scorer: Analyzes input and generates JSON `<score>` block.
- **Tool Integration:**
  - `get_calendar_availability`: Triggered when assessment is complete.

## 2. Component Architecture (`components/contact/`)
### `QualifierChat.tsx` (The Brain)
- Manages local state for the 4 stages: `CHAT`, `SCORE`, `LOG`, `CALENDAR`.
- Handles streaming response parsing (text vs. tool calls).

### `ScoreCard.tsx`
- Animated circular progress showing "Opportunity Score."
- Displays personalized ROI recommendations from Claude's JSON output.

### `AgentLog.tsx`
- Terminal-style emerald text on black.
- Streams tool call events to provide transparency and "wow" factor.

### `CalendarBooking.tsx`
- Displays real availability fetched from Google Calendar.
- Interactive slot selection.

### Modular UI Helpers
- `TechStackBadges.tsx`: Displaying tools like n8n, Make, Next.js.
- `BeforeAfterBar.tsx`: Animated comparison of manual vs. automated results.

## 3. Implementation Phases
1. **Phase 1: Setup & API** (Google Auth, Anthropic Route).
2. **Phase 2: Chat Interface** (Framed Motion animations, stage management).
3. **Phase 3: Scoring & Tools** (Parsing JSON from Claude, triggering Log).
4. **Phase 4: Booking & Polish** (Calendar integration, final CSS adjustments).

## 4. Environment Variables Required
- `ANTHROPIC_API_KEY`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_CALENDAR_ID`

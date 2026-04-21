geek-content
LeadGeek
GeekVoice

    "id": "lead-geek",
    "departments": ["Sales", "Operations"],
    "name": "LeadGeek",
    "description": "AI CRM with predictive lead scoring, pipeline tracking, and next-action recommendations. HubSpot integration available.",
    "status": "active",
    "integrations": ["HubSpot"]
  },
  {
    "id": "geek-voice-sales",
    "departments": ["Sales"],
    "name": "GeekVoice",
    "description": "AI receptionist that qualifies inbound sales calls, answers FAQs, and books appointments automatically — 24/7.",
    "status": "active"
  },
    "id": "hubspot-sales",
    "departments": ["Sales"],
    "name": "HubSpot Integration",
    "description": "Connect your existing HubSpot CRM data to LeadGeek. No duplicate entry — your pipeline follows you.",
    "status": "active",
    "integrations": ["HubSpot"]
  },
  {
    "id": "geek-books",
    "departments": ["Accounting"],
    "name": "GeekBooks",
    "description": "AI-assisted bookkeeping, expense categorization, and financial reporting. QuickBooks integration available.",
    "status": "coming-soon",
    "integrations": ["QuickBooks"]
  },
    {
    "id": "geek-hire",
    "departments": ["Human Resources"],
    "name": "GeekHire",
    "description": "AI-assisted job posting, applicant screening, and interview scheduling. Spend less time on resumes, more time on people.",
    "status": "coming-soon"
  },
    {
    "id": "geek-voice-hr",
    "departments": ["Human Resources"],
    "name": "GeekVoice",
    "description": "Screens inbound applicant calls and books interviews automatically. Your AI hiring assistant.",
    "status": "active"
  },
    {
    "id": "geek-stock",
    "departments": ["Inventory"],
    "name": "GeekStock",
    "description": "AI inventory tracking, low-stock alerts, and reorder recommendations. Know what you have before you run out.",
    "status": "coming-soon"
  },
  {
    "id": "geek-content-ops",
    "departments": ["Operations"],
    "name": "GeekContent",
    "description": "Generates SOPs, internal documentation, and process guides. Turn tribal knowledge into written systems.",
    "status": "active"
  },
    {
    "id": "geek-desk",
    "departments": ["IT & Tech Support"],
    "name": "GeekDesk",
    "description": "AI-powered IT helpdesk ticketing and issue triage. Route the right problem to the right person automatically.",
    "status": "coming-soon"
  },
    {
    "id": "geek-voice-it",
    "departments": ["IT & Tech Support"],
    "name": "GeekVoice",
    "description": "First-line tech support call handling and ticket creation. Answers the call so you do not have to.",
    "status": "active"
  }
  "tools": [{
     "name": "Jasper.ai",
     "href": "https://www.jasper.ai/",
     "description": "Text content generation"
    },
    {
    "name": "Copy.ai",
     "href": "https://www.copy.ai/",
          "description": "Text content generation and translation"
    },
]
  },

  {
    "id": "activecampaign-marketing",
    "departments": "Marketing",
    "name": "ActiveCampaign",
    "description": "Email marketing automation that scores leads as they engage with your content. Integrates with GeekContent.",
    "status": "active",
    "integrations": ["ActiveCampaign"]
  },
  {
    "id": "allo-marketing",
    "departments": ["Marketing"],
    "name": "Allo",
    "description": "AI receptionist that captures inbound leads from marketing campaigns 24/7. Bilingual English/Spanish support.",
    "status": "active",
    "integrations": ["Allo"]
  },
  {
    "id": "activecampaign-sales",
    "departments": ["Sales"],
    "name": "ActiveCampaign",
    "description": "Email-to-sales pipeline automation with behavioral lead scoring.",
    "status": "active",
    "integrations": ["ActiveCampaign"]
  },
  {
    "id": "hubspot-sales",
    "departments": ["Sales"],
    "name": "HubSpot Integration",
    "description": "Connect your existing HubSpot CRM data to LeadGeek. No duplicate entry — your pipeline follows you.",
    "status": "active",
    "integrations": ["HubSpot"]
  },
  {
    "id": "geek-voice-cs",
    "departments": ["Customer Service"],
    "name": "GeekVoice",
    "description": "Answers calls, handles FAQs, routes urgent issues, and books callbacks 24/7. Never sends a customer to voicemail.",
    "status": "active"
  },
  {
    "id": "smith-ai",
    "departments": ["Customer Service"],
    "name": "Smith.ai",
    "description": "Human receptionist fallback when GeekVoice escalates a call beyond AI handling. Hybrid AI + live agent coverage.",
    "status": "active",
    "integrations": ["Smith.ai"]
  },
  {
    "id": "allo-cs",
    "departments": ["Customer Service"],
    "name": "Allo",
    "description": "Bilingual AI answering in English and Spanish. Purpose-built for South Florida businesses serving diverse communities.",
    "status": "active",
    "integrations": ["Allo"]
  },
  {
    "id": "smith-ai-scheduling",
    "departments": ["Scheduling"],
    "name": "Smith.ai",
    "description": "Hybrid AI + human appointment setting for high-value or complex bookings that need a personal touch.",
    "status": "active",
    "integrations": ["Smith.ai"]
  },
  {
    "id": "slang-scheduling",
    "departments": ["Scheduling"],
    "name": "Slang",
    "description": "Restaurant and hospitality-specific AI booking and reservation management. Built for the service industry.",
    "status": "active",
    "integrations": ["Slang"]
  },

app/contact/page.tsx

  - React is never imported but React.JSX.Element is the return type. Either add import React from 'react' or change to JSX.Element.
  - <Suspense> has no fallback. The page goes blank while SchedulerShell hydrates. Add a skeleton or at minimum fallback={null}.

  ---
  components/contact/hero-section.tsx

  1. Default export — CLAUDE.md requires named exports for all components except page.tsx/layout.tsx.
  2. Dead code — the entire commented-out <section> (lines 5–30) should be deleted, not commented out.
  3. Bootstrap class — d-none on line 31 is a Bootstrap utility class. This project uses Tailwind. Should be hidden md:block.
  4. Invalid next/image prop — preload is not a valid prop. The correct prop is priority (boolean).
  5. Mobile layout broken — grid-cols-2 with no grid-cols-1 base. On small screens both columns squeeze. Should be grid-cols-1 md:grid-cols-2.
  6. Older font syntax — font-[var(--font-sora)] is Tailwind 3 arbitrary value syntax. Tailwind 4 uses font-(--font-sora).
  7. No explicit return type on the function.

  ---
  components/contact/agent-log.tsx

  1. Default export — should be named.
  2. key={i} — array index as key. If events are ever reordered or prepended, React will produce incorrect diffs.
  3. No explicit return type on the function.
  4. No Readonly<> wrapper on props.
  5. Older font syntax — font-[var(--font-geist-mono)] → font-(--font-geist-mono).
  6. Not used anywhere on the Contact page — verify this component is still needed or delete it.

  ---
  components/contact/score-card.tsx

  1. Default export — should be named.
  2. key={i} — array index as key on recommendations list.
  3. No explicit return type on the function.
  4. No Readonly<> wrapper on props.
  5. useReducedMotion not checked — two motion animations run unconditionally. CLAUDE.md requires all Motion animations to gate on prefers-reduced-motion.
  6. Older font syntax — font-[var(--font-sora)] → font-(--font-sora).
  7. Not used anywhere on the Contact page — verify or delete.

  ---
  components/contact/before-after-bar.tsx

  1. HARDCODED DATA — METRICS array is hardcoded in TypeScript. Per CLAUDE.md Data Source Rule this must live in /data/before-after-metrics.json.
  2. Default export — should be named.
  3. No explicit return types on either Bar or BeforeAfterBar.
  4. No Readonly<> on Bar props.
  5. Not used anywhere on the Contact page — verify or delete.

  ---
  components/contact/tech-stack-badges.tsx

  1. HARDCODED DATA — STACK array is hardcoded in TypeScript. Must move to /data/tech-stack.json.
  2. Default export — should be named.
  3. No explicit return type.
  4. Not used anywhere on the Contact page — verify or delete.

  ---
  components/contact/scheduler/booking-widget.tsx

  - Solid overall. Two minor items:
  1. eslint-disable comment on the mount effect — since onDateChange is stable (useCallback in shell), you can add it to the dep array and drop the suppression comment.
  2. No loading state on initial fetch — when slotsLoading && availableSlots.length === 0 (first load before any slots arrive), the slot panel is completely empty. A skeleton or
  spinner would prevent the jarring blank space.

  ---
  components/contact/contact-drawer.tsx

  1. String#replace() with regex — phone.replace(/\D/g, '') — CLAUDE.md requires String#replaceAll(). With a string pattern replaceAll('\D', '') won't work, but the correct move is
  phone.replaceAll(/\D/g, '') which is valid in ES2021+.
  2. No Zod validation — the form values are validated inline with hand-rolled functions. Per CLAUDE.md all user input at a boundary must be validated with Zod before being passed
  to a server action.

  ---
  lib/actions/create-booking.ts

  1. No input validation — booking and contact arrive from the client with no Zod parse before being passed to createCalendarEvent and sendBookingConfirmation. This is a server
  action boundary — it must validate both arguments with Zod schemas before use.

  ---
  services/google-calendar.service.ts

  1. Non-null assertion — process.env.GOOGLE_CALENDAR_ID! in getFreeSlots (line 34). CLAUDE.md forbids !. Check and throw explicitly.
  2. .catch() chaining — calendar.freebusy.query(...).catch(err => ...) (lines 47–50). CLAUDE.md requires top-level await with try/catch, not chained .catch().
  3. console.warn / console.error — CLAUDE.md requires Winston structured logging in the service layer, not console.*.
  4. Inconsistent null credential handling — getFreeSlots silently returns [] when credentials are missing; getSlotsForDate throws. They should behave the same way.

  ---
  services/booking-confirmation.service.ts

  1. NEXT_PUBLIC_FROM_EMAIL — this env var is server-only (used only in a server-side service). The NEXT_PUBLIC_ prefix exposes it to the client bundle unnecessarily. Rename to
  FROM_EMAIL.

  ---
  Summary by Priority

  ┌─────┬────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────┬──────────┐
  │  #  │                            File                            │                            Issue                            │ Severity │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 1   │ create-booking.ts                                          │ No Zod validation on server action inputs                   │ Critical │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 2   │ before-after-bar.tsx                                       │ Hardcoded METRICS data                                      │ High     │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 3   │ tech-stack-badges.tsx                                      │ Hardcoded STACK data                                        │ High     │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 4   │ google-calendar.service.ts                                 │ Non-null assertion !, .catch() chaining, console.*          │ High     │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 5   │ hero-section.tsx                                           │ preload not a valid prop, d-none Bootstrap class, dead code │ Medium   │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 6   │ contact-drawer.tsx                                         │ replace → replaceAll, hand-rolled validation vs Zod         │ Medium   │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 7   │ booking-confirmation.service.ts                            │ NEXT_PUBLIC_FROM_EMAIL exposed to client                    │ Medium   │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 8   │ score-card.tsx, booking-widget.tsx                         │ Missing useReducedMotion check                              │ Medium   │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 9   │ All non-page components                                    │ Default exports instead of named                            │ Low      │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤
  │ 10  │ agent-log.tsx, score-card.tsx                              │ key={i} index keys                                          │ Low      │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤                                      
  │ 11  │ contact/page.tsx                                           │ <Suspense> with no fallback                                 │ Low      │
  ├─────┼────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼──────────┤                                      
  │ 12  │ agent-log, score-card, before-after-bar, tech-stack-badges │ May be unused — confirm or delete                           │ Low      │
  └─────┴────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────┴──────────┘                                      
   
  Want me to work through these fixes?            


  {
    "id": "activecampaign-ops",
    "departments": ["Operations"],
    "name": "ActiveCampaign",
    "description": "Automates operational workflows, internal notifications, and follow-up sequences.",
    "status": "active",
    "integrations": ["ActiveCampaign"]
  },


]

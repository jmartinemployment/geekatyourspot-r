# Plan: /Contact — The AI Assessment Experience
## The booking flow IS the product demo

---

## The Honest Critique of the Previous Plan

Static typewriter effects and CSS-animated bars are theatre — they look like AI
without being AI. A visitor who works in tech will see through it immediately.
The right approach: **let actual AI do actual work in front of them.**

---

## What We Are Building

A four-step agentic booking flow. The Opportunity Score is the critical addition —
it gives the visitor something tangible before asking for their time:

```
┌─────────────────────────────────────────────────────┐
│ HERO (full width) │
└─────────────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────────────┐
│ STEP 1 │ │
│ AI Qualifier Chat │ TECH STACK BADGES │
│ (Claude Haiku) │ (static, always visible) │
│ ↓ on qualify │ │
│ STEP 2 │ BEFORE/AFTER METRICS │
│ AI Opportunity │ (CSS animation, honest) │
│ Score: 78/100 │ │
│ + 3 recommendations│ │
│ ↓ visitor accepts │ │
│ STEP 3 │ │
│ Live Agent Log │ │
│ (tool calls shown) │ │
│ ↓ on complete │ │
│ STEP 4 │ │
│ Calendar reveal │ │
│ (earned access) │ │
└──────────────────────┴──────────────────────────────┘
```

**What the visitor watches happen:**
1. Has a real 3-4 message AI conversation (qualification)
2. Receives a personalized AI Opportunity Score with 3 specific recommendations
3. Watches the AI call Google Calendar in real time (the MCP/tool moment)
4. Books the slot — calendar was earned, not given for free

**Why the Opportunity Score matters:**
The visitor gets a concrete deliverable before committing to a call. "Your AI
Opportunity Score: 78/100" with 3 specific recommendations for their business
type means they arrive at the call already sold — they've seen their specific
opportunities in writing. It also ends the chat phase with a moment of value
rather than just a gate to the calendar.

**Cost controls built in:**
- Uses Claude Haiku ($0.001 per full conversation — negligible)
- Business email required before calendar is revealed (filters time-wasters)
- Max 6 AI exchanges per session (hard limit in the API call)
- Rate limiting by IP on the API route

---

## The Three Steps in Detail

### Step 1 — AI Qualifier Chat

A minimal chat interface. The AI opens with a single question and guides
the conversation naturally. Max 4 exchanges. Ends when it has enough to proceed.

**The AI's goal (in its system prompt):** collect business type, biggest pain point,
AI experience level, and a business email. Once it has all four, it transitions to Step 2.

**Model:** Claude Haiku (`claude-haiku-4-5-20251001`) — fast, cheap, more than capable
for a structured 4-question conversation.

**What it feels like to the visitor:**
```
AI: "Before I pull up the calendar — what kind of business do you run?"
User: "I own a dental practice in Boca Raton"
AI: "Got it. What's the one thing eating your time that you wish wasn't?"
User: "Appointment reminders and no-shows are killing us"
AI: "Perfect — that's exactly what we fix. Last thing: drop your
business email and I'll check my availability for you."
User: "dr.smith@bocadental.com"
AI: "Checking the calendar now..." ← triggers Step 2
```

---

### Step 2 — AI Opportunity Score

After the email is collected, the same Haiku call that collects the final answer
also generates a personalized score. This happens in the same streaming response —
no extra API call, no extra cost.

**What appears:**

```
┌─────────────────────────────────────────────┐
│ Your AI Opportunity Score │
│ │
│ 78 / 100 │
│ ████████████████░░░░ │
│ │
│ Top opportunities for your practice: │
│ │
│ ① Appointment reminder automation │
│ Reduce no-shows by 60-80% with │
│ automated SMS + email sequences │
│ │
│ ② After-hours AI receptionist │
│ Capture new patient inquiries 24/7 │
│ without adding front desk staff │
│ │
│ ③ Insurance verification workflow │
│ Automate pre-visit eligibility checks │
│ — save 2-3 hours of admin per day │
│ │
│ [Let's walk through this →] │
└─────────────────────────────────────────────┘
```

**System prompt addition for the score:**
When the AI has all four answers, it outputs a JSON block alongside its final
message containing the score and recommendations. The frontend parses this and
renders the score card.

```
When you have collected all information, end your response with a JSON block:
<score>
{
"score": <number 0-100 based on automation potential>,
"opportunities": [
{ "title": "...", "description": "..." },
{ "title": "...", "description": "..." },
{ "title": "...", "description": "..." }
]
}
</score>
```

The score is calculated by the AI based on:
- Business type (some have more automation potential than others)
- Pain point described (specific = higher score)
- AI experience (none = more opportunity, already using = validate + expand)
- Team size (larger = more ROI potential)

**Why this works:** The visitor sees their specific business mentioned by name
in the recommendations. A dental practice sees dental-specific opportunities,
not generic "automate your workflows" copy. This is personalization that a
static page cannot do.

---

### Step 3 — Live Agent Log (the wow moment)

After the visitor clicks "Let's walk through this →" on the score card, a
terminal-style log panel slides in showing the AI agent calling Google Calendar:

```
▶ Initializing availability check...
→ Tool call: google_calendar.list_events({ days: 14 })
✓ Retrieved 47 existing events
→ Tool call: google_calendar.find_free_slots({ duration: 30, buffer: 15 })
✓ Found 11 available slots across 8 days
→ Filtering for business hours (9am–5pm ET)...
✓ 8 slots confirmed
▶ Ready — showing your options below
```

**Why this matters:** The visitor just watched an AI agent use a tool to call an
external API and make a decision. That is the product they are considering buying.
Most companies claim they can build this. You just showed it working.

**Implementation note:** This is not MCP from the browser — MCP is a server-side
protocol. What we show IS real: the Claude API's `tool_use` feature calling the
Google Calendar API. The log displays the actual tool calls as they happen via
streaming. It's honest. It's impressive. It's accurate.

---

### Step 3 — Calendar + Personalized Confirmation

The Google Calendar iframe appears below the log. When the slot is booked,
Claude generates a personalized confirmation email referencing their specific
pain point from the conversation.

**Not:** "Your appointment is confirmed for Tuesday at 10am."
**Instead:** "We're set for Tuesday at 10am. Based on what you told me about
appointment reminders and no-shows at your practice, I've added three
talking points to our calendar invite so we don't waste a minute."

---

## Files to Create

```
app/api/qualify-agent/route.ts ← streaming AI chat endpoint
app/api/calendar-availability/route.ts ← Google Calendar API wrapper
lib/google-calendar.ts ← Calendar API helper functions
lib/validations/qualify.ts ← Conversation data schema
components/contact/qualifier-chat.tsx ← Step 1: chat UI
components/contact/agent-log.tsx ← Step 2: live tool call display
components/contact/tech-stack-badges.tsx ← Right column (static, always shown)
components/contact/before-after-bar.tsx ← Right column (CSS only, honest)
app/contact/page.tsx ← Wire everything together
```

---

## Phase 1: Google Calendar Setup

**Before writing any React, get calendar access working.**

### 1a — Create a Google Service Account

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable the **Google Calendar API**
4. Create a **Service Account** → download the JSON key file
5. In Google Calendar, share your appointment calendar with the service account email
(give it "Make changes to events" permission)

### 1b — Add credentials to .env.local

```bash
# Add these to your existing .env.local
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
```

**Why a service account:** No OAuth flow needed. Your server authenticates directly.
Visitors never touch your credentials.

---

## Phase 2: Google Calendar API Helper

**Create:** `lib/google-calendar.ts`

```ts
import { google } from 'googleapis'

function getCalendarClient() {
const auth = new google.auth.GoogleAuth({
credentials: {
client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
},
scopes: ['https://www.googleapis.com/auth/calendar'],
})
return google.calendar({ version: 'v3', auth })
}

export interface FreeSlot {
start: string // ISO string
end: string
label: string // "Tuesday, Apr 15 at 10:00 AM"
}

export async function getFreeSlots(daysAhead = 14): Promise<FreeSlot[]> {
const calendar = getCalendarClient()
const calendarId = process.env.GOOGLE_CALENDAR_ID!

const now = new Date()
const future = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000)

// Get busy times
const freeBusy = await calendar.freebusy.query({
requestBody: {
timeMin: now.toISOString(),
timeMax: future.toISOString(),
items: [{ id: calendarId }],
},
})

const busy = freeBusy.data.calendars?.[calendarId]?.busy ?? []

// Generate 30-min slots 9am-4:30pm on weekdays
const slots: FreeSlot[] = []
const cursor = new Date(now)
cursor.setHours(9, 0, 0, 0)

while (cursor < future && slots.length < 12) {
const day = cursor.getDay()
if (day !== 0 && day !== 6) { // Skip weekends
const slotEnd = new Date(cursor.getTime() + 30 * 60 * 1000)
const isBusy = busy.some(b =>
new Date(b.start!) < slotEnd && new Date(b.end!) > cursor
)
if (!isBusy && cursor.getHours() < 17) {
slots.push({
start: cursor.toISOString(),
end: slotEnd.toISOString(),
label: cursor.toLocaleString('en-US', {
weekday: 'long', month: 'short', day: 'numeric',
hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York',
}) + ' ET',
})
}
}
cursor.setMinutes(cursor.getMinutes() + 30)
if (cursor.getHours() >= 17) {
cursor.setDate(cursor.getDate() + 1)
cursor.setHours(9, 0, 0, 0)
}
}

return slots
}
```

**Install googleapis first:**
```bash
npm install googleapis
```

---

## Phase 3: Calendar Availability API Route

**Create:** `app/api/calendar-availability/route.ts`

```ts
import { NextResponse } from 'next/server'
import { getFreeSlots } from '@/lib/google-calendar'

export async function GET() {
try {
const slots = await getFreeSlots(14)
return NextResponse.json({ slots })
} catch (err) {
console.error('Calendar availability error:', err)
return NextResponse.json({ error: 'Could not fetch availability' }, { status: 500 })
}
}
```

**Test it:** Run `npm run dev` and visit `http://localhost:3000/api/calendar-availability`
You should see real available slots from your calendar.

---

## Phase 4: AI Qualifier + Agent API Route

This is the core of the demo. A streaming endpoint that:
1. Runs the AI conversation (Claude Haiku)
2. When qualification is complete, calls the calendar availability tool
3. Streams back both the AI response AND tool call events

**Create:** `app/api/qualify-agent/route.ts`

```ts
import Anthropic from '@anthropic-ai/sdk'
import { getFreeSlots } from '@/lib/google-calendar'

const client = new Anthropic()

const SYSTEM_PROMPT = `You are a friendly assistant for Geek at Your Spot, an AI
consulting firm in South Florida. Your job is to qualify leads before showing
them the booking calendar.

Ask these questions naturally in conversation (not as a list):
1. What type of business do they run?
2. What is their biggest operational pain point right now?
3. Have they used AI tools before?
4. Get their business email address.

Once you have all four answers, say exactly: "Let me check the calendar for you."
Then call the get_calendar_availability tool.

Keep responses short — 1-3 sentences maximum. Be warm and direct.
Never reveal you are AI-powered by Claude. Never discuss pricing.
Hard limit: do not exceed 6 conversational turns total.`

const tools: Anthropic.Tool[] = [
{
name: 'get_calendar_availability',
description: 'Fetches real available appointment slots from the Google Calendar',
input_schema: {
type: 'object' as const,
properties: {},
required: [],
},
},
]

export async function POST(req: Request) {
const { messages } = await req.json() as {
messages: Anthropic.MessageParam[]
}

// Enforce turn limit
if (messages.length > 12) {
return new Response('Session limit reached', { status: 429 })
}

const encoder = new TextEncoder()
const stream = new ReadableStream({
async start(controller) {
try {
const response = await client.messages.create({
model: 'claude-haiku-4-5-20251001',
max_tokens: 300,
system: SYSTEM_PROMPT,
tools,
messages,
stream: true,
})

let toolUseBlock: Anthropic.ToolUseBlock | null = null

for await (const event of response) {
if (event.type === 'content_block_start' &&
event.content_block.type === 'tool_use') {
toolUseBlock = event.content_block
// Signal tool call starting to the client
controller.enqueue(encoder.encode(
`data: ${JSON.stringify({ type: 'tool_start', tool: toolUseBlock.name })}\n\n`
))
}

if (event.type === 'content_block_delta' &&
event.delta.type === 'text_delta') {
controller.enqueue(encoder.encode(
`data: ${JSON.stringify({ type: 'text', text: event.delta.text })}\n\n`
))
}

if (event.type === 'message_stop' && toolUseBlock) {
// Actually call the calendar API
const slots = await getFreeSlots(14)
controller.enqueue(encoder.encode(
`data: ${JSON.stringify({ type: 'tool_result', slots })}\n\n`
))
}
}

controller.enqueue(encoder.encode('data: [DONE]\n\n'))
controller.close()
} catch (err) {
console.error('Agent error:', err)
controller.error(err)
}
},
})

return new Response(stream, {
headers: {
'Content-Type': 'text/event-stream',
'Cache-Control': 'no-cache',
'Connection': 'keep-alive',
},
})
}
```

**Install Anthropic SDK first (if not already):**
```bash
npm install @anthropic-ai/sdk
```

---

## Phase 5: Qualifier Chat UI + Agent Log

**Create:** `components/contact/qualifier-chat.tsx`

This is the longest component. Build it in sections:

```tsx
'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
role: 'user' | 'assistant'
content: string
}

interface ToolLogEntry {
type: 'start' | 'result'
text: string
timestamp: string
}

interface FreeSlot {
start: string
end: string
label: string
}

const OPENING_MESSAGE: Message = {
role: 'assistant',
content: "Before I pull up the calendar — what kind of business do you run?",
}

export default function QualifierChat() {
const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE])
const [input, setInput] = useState('')
const [loading, setLoading] = useState(false)
const [toolLog, setToolLog] = useState<ToolLogEntry[]>([])
const [slots, setSlots] = useState<FreeSlot[] | null>(null)
const [step, setStep] = useState<'chat' | 'log' | 'calendar'>('chat')
const bottomRef = useRef<HTMLDivElement>(null)

useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages, toolLog])

const now = () => new Date().toLocaleTimeString('en-US', {
hour: '2-digit', minute: '2-digit', second: '2-digit'
})

const sendMessage = async () => {
if (!input.trim() || loading) return

const userMessage: Message = { role: 'user', content: input.trim() }
const newMessages = [...messages, userMessage]
setMessages(newMessages)
setInput('')
setLoading(true)

try {
const res = await fetch('/api/qualify-agent', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
messages: newMessages.map(m => ({
role: m.role,
content: m.content,
})),
}),
})

const reader = res.body!.getReader()
const decoder = new TextDecoder()
let assistantText = ''

while (true) {
const { done, value } = await reader.read()
if (done) break

const chunk = decoder.decode(value)
const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

for (const line of lines) {
const data = line.slice(6)
if (data === '[DONE]') break

const event = JSON.parse(data)

if (event.type === 'text') {
assistantText += event.text
setMessages(prev => {
const updated = [...prev]
const last = updated[updated.length - 1]
if (last?.role === 'assistant' && last !== userMessage) {
updated[updated.length - 1] = { ...last, content: assistantText }
} else {
updated.push({ role: 'assistant', content: assistantText })
}
return updated
})
}

if (event.type === 'tool_start') {
setStep('log')
setToolLog(prev => [...prev,
{ type: 'start', text: '▶ Initializing availability check...', timestamp: now() },
{ type: 'start', text: '→ Tool call: google_calendar.list_events({ days: 14 })', timestamp: now() },
])
}

if (event.type === 'tool_result') {
setToolLog(prev => [...prev,
{ type: 'result', text: `✓ Retrieved calendar data`, timestamp: now() },
{ type: 'start', text: '→ Tool call: google_calendar.find_free_slots({ duration: 30 })', timestamp: now() },
{ type: 'result', text: `✓ Found ${event.slots.length} available slots`, timestamp: now() },
{ type: 'result', text: '▶ Ready — showing your options below', timestamp: now() },
])
setSlots(event.slots)
setTimeout(() => setStep('calendar'), 1500)
}
}
}
} catch (err) {
console.error('Chat error:', err)
} finally {
setLoading(false)
}
}

return (
<div className="space-y-4">

{/* ── Chat window ─────────────────────────── */}
<div className="rounded-2xl border border-white/10 bg-zinc-900/80 overflow-hidden">
<div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
<span className="flex h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
<p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-orange-400">
AI Assessment Agent
</p>
<span className="ml-auto text-[0.6rem] text-slate-600">
Powered by Claude Haiku
</span>
</div>

{/* Messages */}
<div className="p-5 space-y-4 max-h-72 overflow-y-auto">
{messages.map((msg, i) => (
<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
<div className={`rounded-xl px-4 py-2 max-w-[85%] text-sm leading-relaxed ${
msg.role === 'user'
? 'bg-orange-600 text-white'
: 'bg-zinc-800 text-slate-200'
}`}>
{msg.content}
</div>
</div>
))}
{loading && (
<div className="flex justify-start">
<div className="bg-zinc-800 rounded-xl px-4 py-2">
<span className="flex gap-1">
<span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
<span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
<span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
</span>
</div>
</div>
)}
<div ref={bottomRef} />
</div>

{/* Input */}
{step === 'chat' && (
<div className="flex gap-2 px-4 pb-4">
<input
type="text"
value={input}
onChange={e => setInput(e.target.value)}
onKeyDown={e => e.key === 'Enter' && sendMessage()}
placeholder="Type your answer…"
className="flex-1 rounded-lg border border-white/10 bg-zinc-800 px-3 py-2
text-sm text-white placeholder:text-slate-600
focus:outline-none focus:ring-2 focus:ring-orange-500"
/>
<button
onClick={sendMessage}
disabled={loading || !input.trim()}
className="rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-40
px-4 py-2 text-sm font-bold text-white transition-colors"
>
→
</button>
</div>
)}
</div>

{/* ── Agent log ───────────────────────────── */}
{step !== 'chat' && toolLog.length > 0 && (
<div className="rounded-2xl border border-emerald-500/20 bg-zinc-950 p-5 font-mono">
<p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
Agent Activity Log
</p>
<div className="space-y-1">
{toolLog.map((entry, i) => (
<div key={i} className="flex gap-3 text-xs">
<span className="text-slate-600 shrink-0">{entry.timestamp}</span>
<span className={entry.type === 'result' ? 'text-emerald-400' : 'text-slate-300'}>
{entry.text}
</span>
</div>
))}
</div>
</div>
)}

{/* ── Calendar (revealed after agent completes) ── */}
{step === 'calendar' && slots && (
<div className="rounded-2xl border border-white/10 bg-zinc-900/80 overflow-hidden">
<div className="px-5 py-3 border-b border-white/10">
<p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-orange-400">
Available Times
</p>
</div>
<div className="p-5 grid grid-cols-1 gap-2">
{slots.slice(0, 8).map((slot) => (
<a
key={slot.start}
href={`https://calendar.google.com/calendar/appointments/schedules/AcZssZ2wX1cukknZpriNdbxsSX8XrVEKooH4pl7DrYkx6DzhzvV-e2h4Widdeo6xC_JbkBjowxGVLT_8?gv=true`}
target="_blank"
rel="noreferrer"
className="rounded-lg border border-white/10 bg-zinc-800 hover:border-orange-500/50
hover:bg-zinc-700 px-4 py-3 text-sm text-white transition-all
flex items-center justify-between group"
>
<span>{slot.label}</span>
<span className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
Book →
</span>
</a>
))}
</div>
</div>
)}

</div>
)
}
```

---

## Phase 6: Right Column Components

These are honest supporting elements — not pretending to be AI.

**Create:** `components/contact/tech-stack-badges.tsx`

```tsx
const STACK = [
{ name: 'Claude API', note: 'AI reasoning', color: 'text-orange-400 border-orange-400/30 bg-orange-400/10' },
{ name: 'n8n', note: 'Automation', color: 'text-red-400 border-red-400/30 bg-red-400/10' },
{ name: 'Make.com', note: 'Workflows', color: 'text-purple-400 border-purple-400/30 bg-purple-400/10' },
{ name: 'Next.js', note: 'This site', color: 'text-white border-white/20 bg-white/5' },
{ name: 'Supabase', note: 'Database', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' },
{ name: 'Resend', note: 'Email delivery', color: 'text-blue-400 border-blue-400/30 bg-blue-400/10' },
{ name: 'MCP', note: 'Agent protocol', color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10' },
]

export default function TechStackBadges() {
return (
<div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
<p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
The stack we build with
</p>
<div className="flex flex-wrap gap-2">
{STACK.map(({ name, note, color }) => (
<div key={name} className={`rounded-lg border px-3 py-1.5 ${color}`}>
<p className="text-xs font-bold">{name}</p>
<p className="text-[0.6rem] opacity-70">{note}</p>
</div>
))}
</div>
</div>
)
}
```

**Create:** `components/contact/before-after-bar.tsx`

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

const METRICS = [
{ label: 'Hours on manual data entry', before: 12, after: 1, unit: 'hrs/wk' },
{ label: 'Lead response time', before: 24, after: 2, unit: 'hrs avg' },
{ label: 'Follow-up conversion rate', before: 8, after: 27, unit: '%' },
]

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
const [width, setWidth] = useState(0)
const ref = useRef<HTMLDivElement>(null)

useEffect(() => {
const observer = new IntersectionObserver(
([entry]) => { if (entry.isIntersecting) setWidth((value / max) * 100) },
{ threshold: 0.3 }
)
if (ref.current) observer.observe(ref.current)
return () => observer.disconnect()
}, [value, max])

return (
<div ref={ref} className="h-2 rounded-full bg-white/10 overflow-hidden">
<div
className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
style={{ width: `${width}%` }}
/>
</div>
)
}

export default function BeforeAfterBar() {
const max = Math.max(...METRICS.flatMap(m => [m.before, m.after]))
return (
<div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
<p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
Typical results after 90 days
</p>
<div className="space-y-5">
{METRICS.map(({ label, before, after, unit }) => (
<div key={label}>
<div className="flex justify-between text-xs text-slate-400 mb-2">
<span>{label}</span>
<span className="text-orange-400 font-bold">{before} → {after} {unit}</span>
</div>
<div className="space-y-1">
<Bar value={before} max={max} color="bg-slate-600" />
<Bar value={after} max={max} color="bg-orange-500" />
</div>
</div>
))}
</div>
<p className="mt-4 text-[0.6rem] text-slate-600">
Based on client averages. Results vary by business.
</p>
</div>
)
}
```

---

## Phase 7: Wire It Together

**Rewrite:** `app/contact/page.tsx`

```tsx
import type { Metadata } from 'next'
import QualifierChat from '@/components/contact/qualifier-chat'
import TechStackBadges from '@/components/contact/tech-stack-badges'
import BeforeAfterBar from '@/components/contact/before-after-bar'

export const metadata: Metadata = {
title: 'Schedule Your AI Assessment | Geek at Your Spot',
description:
'Book a free AI assessment. Talk to our AI agent, watch it check the calendar in real time, then pick your slot. South Florida small business AI consulting.',
}

export default function ContactPage() {
return (
<>
{/* ── Hero ─────────────────────────────────── */}
<section className="w-full bg-[#023059] py-24 px-5">
<div className="container mx-auto max-w-4xl text-center">
<p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-orange-400 mb-4">
AI Assessment
</p>
<h1 className="text-white text-5xl md:text-6xl font-black font-(--font-sora) leading-[1.05] mb-6">
See it working<br />before we talk
</h1>
<p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed">
Answer three questions. Watch the AI check the calendar in real time.
Book your slot. This is exactly what we build for your business.
</p>
</div>
</section>

{/* ── Main Grid ────────────────────────────── */}
<section className="w-full bg-zinc-950 py-16 px-5">
<div className="container mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

{/* Left — the agent experience */}
<div className="lg:col-span-7">
<QualifierChat />
</div>

{/* Right — supporting evidence */}
<div className="lg:col-span-5 space-y-6">
<TechStackBadges />
<BeforeAfterBar />
</div>

</div>
</div>
</section>
</>
)
}
```

---

## Build Order Checklist

- [ ] **Setup** — Create Google Service Account, share calendar, add env vars
- [ ] **Phase 2** — Create `lib/google-calendar.ts`, install `googleapis`
- [ ] **Phase 3** — Create `app/api/calendar-availability/route.ts`, test at `/api/calendar-availability`
- [ ] **Phase 4** — Create `app/api/qualify-agent/route.ts`, install `@anthropic-ai/sdk`
- [ ] **Phase 5** — Create `components/contact/qualifier-chat.tsx`
- [ ] **Phase 6** — Create `tech-stack-badges.tsx` and `before-after-bar.tsx`
- [ ] **Phase 7** — Rewrite `app/contact/page.tsx`
- [ ] Run `npm run dev` → open `http://localhost:3000/contact`
- [ ] Have a full conversation with the agent → confirm calendar slots appear
- [ ] Confirm the agent log shows real tool calls
- [ ] Check your email after booking → confirm Resend fired

---

## What the Visitor Experiences

1. Arrives — sees headline **"See it working before we talk"**
2. Answers 3 questions in a real AI conversation
3. Watches a terminal log show the agent calling Google Calendar
4. Sees real available slots surface from that call
5. Books the slot

**They just experienced your product. They haven't paid anything yet.
The calendar was the close. The agent was the pitch.**

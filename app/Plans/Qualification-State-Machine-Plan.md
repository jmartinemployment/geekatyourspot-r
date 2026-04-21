# Implementation Plan: Deterministic Qualification State Machine

## 1. Overview
Replace the existing `QualifierChat` (AI-based) with a deterministic, state-machine-driven qualification flow. This system will collect structured data through a linear, multi-step selection process, beginning with a calendar booking selection using the shadcn/ui Calendar component, followed by specific qualification questions.

## 2. Architecture: State Machine
The system will be implemented as a React component using a `useReducer` pattern to manage state transitions and data collection.

### Flow States
- `IDLE`: Initial state, User selects a date and time using the shadcn/ui Calendar.
- `DEPARTMENT_SELECTED`: Department selection (Marketing, Sales, etc.).
- `TOOLS_SELECTED`: Tools selection (filtered by the chosen department).
- `CURRENT_SETUP_SELECTED`: Current setup context selection (None, Tools, Agency, Internal).
- `COMPLETE`: Final submission state with the complete structured payload.

## 3. Core Data Structures

### Types (`types/qualification.ts`)
```ts
export type Department = 'marketing' | 'sales' | 'customer_support' | 'operations' | 'finance' | 'hr' | 'it' | 'supply_chain' | 'legal';

export type CurrentSetup = 'none' | 'tools' | 'agency' | 'internal';

export interface Tool {
  id: string;
  department: Department;
  name: string;
  description: string;
}

export interface QualificationData {
  department: Department | null;
  tools: string[];
  currentSetup: CurrentSetup | null;
  booking: {
    date: string;
    time: string; // Stored separately or parsed from date
  } | null;
  timestamp?: number;
}
```

### Static Configuration (`config/qualification-tools.ts`)
Define the catalog of tools mapped to departments (e.g., SEO Autopilot for Marketing, AI Lead Scoring for Sales).

## 4. Component Development

### New Component: `components/contact/qualification-flow.tsx`
- **Initial Step (Calendar):** Implement date selection using the `Calendar` component from `shadcn/ui`. Add a secondary UI for time slot selection based on the chosen date. Upon confirming a slot, the machine transitions from `IDLE` to the first qualification question, storing the `{ date, time }` in the state.
- **State Management:** `useReducer` to handle actions:
  - `SET_BOOKING`: Sets date/time and moves to Department selection.
  - `SELECT_DEPARTMENT`: Sets department and moves to Tools selection.
  - `TOGGLE_TOOL`: Adds/removes tools from the list.
  - `SELECT_SETUP`: Sets setup context and moves to the final submission state.
  - `SUBMIT`: Finalizes the data and triggers the `COMPLETE` state.
- **UI Progress:** Linear step indicator (Booking → Department → Tools → Setup → Complete).
- **Styling:** Maintain the dark zinc/slate aesthetic with #8C2703 (Geek Orange) highlights, overriding shadcn/ui defaults where necessary to match the theme.

## 5. Integration Steps

### Step 1: Install & Configure shadcn/ui Calendar
- Ensure `date-fns` and `react-day-picker` are installed (required for shadcn Calendar).
- Add the Calendar component via shadcn CLI if not already present: `npx shadcn@latest add calendar`

### Step 2: Replace UI in `app/contact/page.tsx`
- Remove `QualifierChat` and replace it with `QualificationFlow`.
- Update Hero copy: "Book your AI assessment and tell us about your business."

### Step 3: Update Data Handling
- The final state will output the `FinalSubmission` object. For now, this can be logged or sent to a simple placeholder endpoint.
- Use deterministic availability (either a static schedule or a simplified fetch) to populate time slots after a date is selected in the shadcn Calendar.

### Step 4: Cleanup
- Delete `app/api/qualify-agent/route.ts` and related AI utilities (`lib/google-calendar.ts` if only used by the agent).
- Remove `components/contact/qualifier-chat.tsx` and its sub-components (`AgentLog`, `ScoreCard`).

## 6. UX & Design Principles
- **Deterministic:** No free-text inputs; selection-only.
- **Predictable:** Linear progression with no branching.
- **Capability-Focused:** Using "Tools" to expose actual service offerings.

## 7. Success Criteria
- [ ] Users first select a date using the shadcn Calendar and a time slot before being asked qualification questions.
- [ ] The flow is strictly linear and deterministic.
- [ ] The final output contains both the booking data and the qualification context in a structured JSON format.
- [ ] No AI token costs are incurred.

# CLAUDE.md — Project Governance Root
# Next.js 16.2 · React 19.2 · TypeScript 5 · Tailwind 4 · shadcn/ui 4.1 · Motion 12.38 · OAuth

> This file is the **authoritative source of truth** for all AI-assisted development in this project.
> Every sub-directory with its own `CLAUDE.md` inherits these rules and may only **add** constraints — never relax them.
> When in conflict, the **most restrictive** rule wins.

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Technology Stack](#2-technology-stack)
3. [TypeScript 5 Rules](#3-typescript-5-rules)
4. [Next.js 16.2 Rules](#4-nextjs-162-rules)
5. [React 19.2 Rules](#5-react-192-rules)
6. [Tailwind 4 Rules](#6-tailwind-4-rules)
7. [shadcn/ui 4.1 Rules](#7-shadcnui-41-rules)
8. [Motion 12.38 Rules](#8-motion-1238-rules)
9. [OAuth Rules](#9-oauth-rules)
10. [State Management](#10-state-management)
11. [Service Layer Architecture](#11-service-layer-architecture)
12. [Accessibility (WCAG AA / AXE / SonarQube)](#12-accessibility-wcag-aa--axe--sonarqube)
13. [File & Folder Conventions](#13-file--folder-conventions)
14. [Naming Conventions](#14-naming-conventions)
15. [Testing Requirements](#15-testing-requirements)
16. [Performance Budget](#16-performance-budget)
17. [Security Requirements](#17-security-requirements)
18. [Error Handling](#18-error-handling)
19. [Environment & Configuration](#19-environment--configuration)
20. [CI/CD Conventions](#20-cicd-conventions)
21. [AI Assistant Directives](#21-ai-assistant-directives)

---

## 1. Project Identity

```
Project: [PROJECT_NAME]
Stack:   Next.js 16.2 App Router / React 19.2 / TypeScript 5 strict
Styling: Tailwind CSS 4 / shadcn/ui 4.1
Motion:  Motion 12.38 (Framer Motion successor)
Auth:    OAuth 2.0 / OIDC via [Auth.js v5 | NextAuth | Auth0 — choose one]
Backend: C# .NET API with Microsoft Entity Framework (hosted on Railway)
API URL: https://geekbackend-production.up.railway.app
Lint:    ESLint flat config + Prettier + SonarQube
Tests:   Vitest + React Testing Library + Playwright
Node:    >=22.x LTS
```

---

## 2. Technology Stack

### Pinned Versions (do not upgrade without a migration ticket)

| Package | Version | Notes |
|---|---|---|
| next | 16.2.x | App Router only |
| react | 19.2.x | No Class Components |
| react-dom | 19.2.x | — |
| typescript | 5.x | `strict: true` always |
| tailwindcss | 4.x | CSS-first config |
| @shadcn/ui | 4.1.x | Registry-based install |
| motion | 12.38.x | Named exports only |
| eslint | 9.x | Flat config |
| vitest | 2.x | — |
| playwright | 1.x | — |

### Backend ORM

The data layer is a **C# .NET API** using **Microsoft Entity Framework** hosted on Railway.
The Next.js frontend NEVER accesses the database directly — all data access goes through the REST API.

```
Backend API: https://geekbackend-production.up.railway.app
ORM:         Microsoft Entity Framework (C# .NET)
DB:          PostgreSQL via Supabase (mpnruwauxsqbrxvlksnf)
```

**API conventions:**
- Request bodies use **PascalCase** field names (C# serialization default)
- Response bodies use **camelCase** field names (JSON serialization)
- All DB writes go through API endpoints — never bypass with direct Supabase calls

### Prohibited Packages

```
# NEVER install:
framer-motion          # superseded by motion 12.x
styled-components      # conflicts with Tailwind 4
@emotion/*             # same conflict
moment                 # use date-fns or temporal
lodash                 # use native ES2024 or es-toolkit
axios                  # use native fetch or ky
react-router-dom       # Next.js App Router handles routing
```

---

## 3. TypeScript 5 Rules

### tsconfig.json — Required Settings

```jsonc
{
  "compilerOptions": {
    "target": "ES2024",
    "lib": ["ES2024", "DOM", "DOM.Iterable"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true,
    "isolatedDeclarations": true,      // TS 5.5+
    "erasableSyntaxOnly": true,        // TS 5.5+
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Prohibited tsconfig Settings

```
❌ NEVER use "ignoreDeprecations" — fix the deprecation instead
   Reason: silencing compiler warnings masks real issues and causes build failures
   across different TypeScript versions and environments (e.g. Render.com CI).
   If a setting is deprecated, remove it and fix the root cause.
```

### Enforcement Rules

```typescript
// ✅ ALWAYS — explicit return types on all exported functions
export function getUser(id: string): Promise<User> { ... }

// ✅ ALWAYS — `type` keyword for non-class shapes
export type UserRole = 'admin' | 'staff' | 'guest';
export interface UserProfile { ... }  // interface for object shapes with extension potential

// ✅ ALWAYS — `satisfies` operator for config objects
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
} satisfies Record<string, string>;

// ✅ ALWAYS — discriminated unions over boolean flags
type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// ❌ NEVER — `any`. Use `unknown` + type narrowing
function parse(input: unknown): User { ... }

// ❌ NEVER — non-null assertion (!). Use optional chaining + nullish coalescing
const name = user?.profile?.name ?? 'Anonymous';

// ❌ NEVER — `enum`. Use `const` object + `keyof typeof`
const Direction = { Up: 'up', Down: 'down' } as const;
type Direction = typeof Direction[keyof typeof Direction];

// ❌ NEVER — `namespace` or `module` keyword
// ❌ NEVER — `require()`. Use `import`
// ❌ NEVER — type assertions without narrowing (use `as` only with `satisfies` guard)
```

### Zod Integration

All external data boundaries (API responses, form inputs, env vars, URL params) **MUST** be validated with Zod:

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'staff', 'guest']),
  createdAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;
```

---

## 4. Next.js 16.2 Rules

### Router: App Router ONLY

```
src/app/                 ← All routes live here
  layout.tsx             ← Root layout (required)
  page.tsx               ← Route segment page
  loading.tsx            ← Suspense boundary
  error.tsx              ← Error boundary ('use client')
  not-found.tsx          ← 404 handler
  global-error.tsx       ← Root error boundary
  (auth)/                ← Route group — no URL segment
  [id]/                  ← Dynamic segment
  [...slug]/             ← Catch-all
  @modal/                ← Parallel route slot
```

### Server vs Client Component Rules

```typescript
// DEFAULT: Server Component — no directive needed
// Use for: data fetching, DB access, heavy computation, SEO content

// 'use client' — ONLY when you need:
// • useState / useReducer / useContext
// • useEffect / lifecycle
// • Browser APIs (window, document, navigator)
// • Event listeners
// • Motion animations (client-side)
// • Third-party client libraries

// 'use server' — Server Actions ONLY
// Mark async functions in Server Components or separate action files
'use server';
export async function submitForm(formData: FormData): Promise<ActionResult> { ... }
```

### Data Fetching Hierarchy

```typescript
// 1. Server Components — fetch directly (preferred)
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;  // Next.js 16: params is now a Promise
  const product = await productService.getById(id);
  return <ProductDetail product={product} />;
}

// 2. fetch() — always pass cache/revalidate options
const data = await fetch(url, {
  next: { revalidate: 60 },        // ISR
  // OR
  cache: 'no-store',               // Dynamic (SSR)
  // OR
  next: { tags: ['products'] },    // On-demand revalidation
});

// 3. React cache() — deduplicate within a request
import { cache } from 'react';
export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } });
});

// ❌ NEVER fetch in useEffect for initial data — use Server Components
// ❌ NEVER use getServerSideProps / getStaticProps (Pages Router APIs)
```

### Server Actions

```typescript
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

export async function createPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // 1. Validate session
  const session = await getSession();
  if (!session) redirect('/login');

  // 2. Validate input
  const parsed = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });
  if (!parsed.success) {
    return { status: 'error', errors: parsed.error.flatten().fieldErrors };
  }

  // 3. Execute
  try {
    await postService.create({ ...parsed.data, authorId: session.user.id });
  } catch (error) {
    return { status: 'error', message: 'Failed to create post.' };
  }

  // 4. Invalidate cache
  revalidateTag('posts');
  return { status: 'success' };
}
```

### Metadata

```typescript
// Static metadata
export const metadata: Metadata = {
  title: { template: '%s | App Name', default: 'App Name' },
  description: '...',
  openGraph: { ... },
};

// Dynamic metadata
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const product = await productService.getById(id);
  return { title: product.name };
}
```

### Image Optimization

```typescript
// ✅ ALWAYS use next/image
import Image from 'next/image';
<Image
  src="/hero.webp"
  alt="Descriptive alt text"    // ← Required for a11y
  width={1200}
  height={630}
  priority                       // Above fold images only
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ❌ NEVER use <img> — SonarQube will flag it
```

### Middleware

```typescript
// middleware.ts — project root
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const session = await auth();
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 5. React 19.2 Rules

### Component Rules

```typescript
// ✅ ALWAYS — functional components with explicit return type
export function UserCard({ user }: UserCardProps): React.JSX.Element { ... }

// ✅ ALWAYS — destructure props with type inline or imported
interface UserCardProps {
  user: User;
  onSelect?: (id: string) => void;
  className?: string;
}

// ❌ NEVER — Class Components
// ❌ NEVER — React.FC / React.FunctionComponent (hides return type)
// ❌ NEVER — default export for components (named exports only, except page.tsx/layout.tsx)
```

### React 19 APIs — Use These

```typescript
// useActionState — form state tied to Server Actions
import { useActionState } from 'react';
const [state, formAction, isPending] = useActionState(createPost, initialState);

// useFormStatus — inside form children to access pending state
import { useFormStatus } from 'react-dom';
const { pending } = useFormStatus();

// use() — read promises and context (replaces some useEffect patterns)
import { use } from 'react';
const user = use(userPromise);  // In Server or Client Components

// useOptimistic — optimistic UI updates
import { useOptimistic } from 'react';
const [optimisticItems, addOptimistic] = useOptimistic(items, (state, newItem) => [...state, newItem]);

// React.cache() — server-side request deduplication
import { cache } from 'react';
```

### Hooks Rules

```typescript
// ✅ Custom hooks — prefix with 'use', single responsibility
export function useProductSearch(query: string): UseProductSearchResult { ... }

// ✅ Ref pattern — use useRef for DOM, use state for render-triggering values
const inputRef = useRef<HTMLInputElement>(null);

// ❌ NEVER — useEffect for data fetching initial load (use Server Components)
// ❌ NEVER — useEffect with missing dependencies (ESLint enforces exhaustive-deps)
// ❌ NEVER — setState during render (causes infinite loops)
```

### Suspense & Error Boundaries

```typescript
// Wrap async data in Suspense with meaningful fallback
<Suspense fallback={<ProductCardSkeleton />}>
  <ProductList categoryId={categoryId} />
</Suspense>

// Error boundaries — use error.tsx for route segments
// For component-level: use react-error-boundary
import { ErrorBoundary } from 'react-error-boundary';
<ErrorBoundary fallback={<ErrorFallback />}>
  <RiskyComponent />
</ErrorBoundary>
```

### Concurrent Features

```typescript
// useTransition — non-urgent state updates (keeps UI responsive)
const [isPending, startTransition] = useTransition();
startTransition(() => setFilter(newFilter));

// useDeferredValue — defer expensive renders
const deferredQuery = useDeferredValue(searchQuery);
```

---

## 6. Tailwind 4 Rules

### CSS-First Configuration

Tailwind 4 uses `@import` in CSS — **no `tailwind.config.js`** unless absolutely needed:

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Design tokens — single source of truth */
  --color-primary: oklch(55% 0.22 264);
  --color-primary-foreground: oklch(98% 0.01 264);
  --color-secondary: oklch(96% 0.01 264);
  --color-secondary-foreground: oklch(20% 0.02 264);
  --color-destructive: oklch(55% 0.22 27);
  --color-muted: oklch(96% 0.01 264);
  --color-muted-foreground: oklch(50% 0.02 264);
  --color-border: oklch(90% 0.02 264);
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(10% 0.02 264);

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", monospace;

  --shadow-sm: 0 1px 2px oklch(0% 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px oklch(0% 0 0 / 0.08);
}

@layer base {
  *, *::before, *::after { box-sizing: border-box; }
  body { @apply bg-background text-foreground font-sans antialiased; }
  :focus-visible { @apply outline-2 outline-offset-2 outline-primary; }  /* a11y */
}
```

### Class Authoring Rules

```tsx
// ✅ Use cn() utility for conditional classes (clsx + tailwind-merge)
import { cn } from '@/lib/utils';

<div className={cn(
  'rounded-lg border bg-card p-4 shadow-sm',
  isActive && 'border-primary',
  className,  // always accept and spread className prop
)} />

// ✅ Group related classes — layout | spacing | typography | color | interaction
<button className="
  flex items-center gap-2           /* layout */
  px-4 py-2                        /* spacing */
  text-sm font-medium              /* typography */
  bg-primary text-primary-foreground /* color */
  rounded-md                       /* shape */
  hover:bg-primary/90              /* interaction */
  focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2  /* a11y */
  disabled:pointer-events-none disabled:opacity-50  /* state */
  transition-colors duration-150   /* motion */
" />

// ❌ NEVER — arbitrary values for design tokens
// Bad:  text-[#3b82f6]
// Good: text-primary

// ❌ NEVER — inline styles for spacing/color (use Tailwind classes)
// ❌ NEVER — !important via Tailwind `!` modifier except in utility overrides
```

### Responsive Design

```tsx
// Mobile-first always
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />

// Container width
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" />
```

### Dark Mode

```css
/* globals.css — add dark theme tokens */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(10% 0.02 264);
    --color-foreground: oklch(95% 0.01 264);
    /* ... all tokens override */
  }
}
```

---

## 7. shadcn/ui 4.1 Rules

### Installation Protocol

```bash
# NEVER copy-paste components manually
# ALWAYS use the CLI
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
```

### Components.json (required config)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Usage Rules

```typescript
// ✅ Import from @/components/ui — NEVER from shadcn registry directly
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// ✅ Extend, don't fork — add props via composition
interface AppButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  icon?: React.ReactNode;
}

export function AppButton({ loading, icon, children, disabled, ...props }: AppButtonProps) {
  return (
    <Button disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading ? <Spinner aria-hidden="true" /> : icon}
      {children}
    </Button>
  );
}

// ✅ Form — ALWAYS use with React Hook Form + Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// ❌ NEVER — modify files in src/components/ui directly for business logic
//            (modify only for style overrides; document the change)
// ❌ NEVER — use shadcn components as Server Components if they use hooks
//            (all shadcn interactive components require 'use client')
```

### Required shadcn Components

These are pre-approved. Request others via PR:

```
Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch
Form, Label
Dialog, Sheet, AlertDialog, Drawer
Card, Separator, Skeleton, Badge, Avatar
Table, Pagination
Toast (Sonner integration), Alert
NavigationMenu, Breadcrumb, Tabs
Command, Combobox
Tooltip, Popover, HoverCard
ScrollArea, AspectRatio
```

---

## 8. Motion 12.38 Rules

### Import Rules

```typescript
// ✅ ALWAYS — named imports from 'motion/react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';

// ❌ NEVER — default import
// ❌ NEVER — import from 'framer-motion' (different package)
```

### Animation Principles

```typescript
// ✅ Respect prefers-reduced-motion — ALWAYS check
import { useReducedMotion } from 'motion/react';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0 : 0.3,
        ease: [0.16, 1, 0.3, 1],  // expo out
      }}
    >
      {children}
    </motion.div>
  );
}

// ✅ AnimatePresence — required for exit animations
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>
```

### Animation Budget

| Interaction | Max Duration | Easing |
|---|---|---|
| Micro (button press) | 100ms | ease-out |
| Element enter/exit | 200–300ms | expo out |
| Page transition | 300–400ms | ease-in-out |
| Complex orchestration | 600ms max | custom spring |

```typescript
// ✅ Shared transition presets — import from constants
// src/lib/motion.ts
export const TRANSITIONS = {
  micro: { duration: 0.1, ease: 'easeOut' },
  fast: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  default: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  spring: { type: 'spring', stiffness: 400, damping: 30 },
} as const;

export const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
} as const;
```

### Stagger Patterns

```typescript
// ✅ Orchestrate child animations from parent
<motion.ul
  variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.li key={item.id} variants={VARIANTS.fadeUp}>
      <ItemCard item={item} />
    </motion.li>
  ))}
</motion.ul>
```

### Page Transitions

```typescript
// src/components/layouts/page-transition.tsx
'use client';
import { motion } from 'motion/react';
import { useReducedMotion } from 'motion/react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.main
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={TRANSITIONS.default}
    >
      {children}
    </motion.main>
  );
}
```

---

## 9. OAuth Rules

### Provider Setup (Auth.js v5 pattern)

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { db } from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Adapter: use a database adapter compatible with your auth store.
  // PrismaAdapter has been removed — Entity Framework owns the DB layer.
  // Use a custom JWT strategy or a Supabase-compatible adapter.
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as UserRole;
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
});

// src/app/api/auth/[...nextauth]/route.ts
export { GET, POST } from '@/lib/auth';
```

### Session Access Patterns

```typescript
// Server Component — use auth() directly
import { auth } from '@/lib/auth';

export default async function ProtectedPage() {
  const session = await auth();
  if (!session) redirect('/login');
  return <Dashboard user={session.user} />;
}

// Client Component — use SessionProvider + useSession
'use client';
import { useSession } from 'next-auth/react';

export function UserMenu() {
  const { data: session, status } = useSession();
  if (status === 'loading') return <Skeleton />;
  if (!session) return <SignInButton />;
  return <Avatar user={session.user} />;
}

// Server Action — validate session before every action
'use server';
export async function deletePost(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { status: 'error', message: 'Unauthorized' };
  if (session.user.role !== 'admin') return { status: 'error', message: 'Forbidden' };
  // ...
}
```

### RBAC (Role-Based Access Control)

```typescript
// src/lib/rbac.ts
export const ROLES = ['admin', 'editor', 'viewer'] as const;
export type Role = typeof ROLES[number];

export const PERMISSIONS = {
  'post:create': ['admin', 'editor'],
  'post:delete': ['admin'],
  'user:manage': ['admin'],
} as const satisfies Record<string, readonly Role[]>;

export type Permission = keyof typeof PERMISSIONS;

export function can(role: Role, permission: Permission): boolean {
  return (PERMISSIONS[permission] as readonly string[]).includes(role);
}

// Usage in Server Action:
if (!can(session.user.role, 'post:delete')) {
  return { status: 'error', message: 'Forbidden' };
}
```

### Security Requirements

```
✅ PKCE flow enforced for all OAuth providers
✅ State parameter validated to prevent CSRF
✅ Tokens stored in httpOnly, Secure, SameSite=Lax cookies
✅ JWT signed with RS256 (rotating keys in production)
✅ Session expiry: 30 days max, 24h inactivity
✅ Refresh token rotation on every use
❌ NEVER store tokens in localStorage or sessionStorage
❌ NEVER log tokens, session IDs, or user PII
❌ NEVER expose client secrets in client bundles
```

---

## 10. State Management

### Decision Matrix

```
Is the data shared across routes?
  No → Component-Level State (useState / useReducer)
  Yes → Is it shareable via URL?
    Yes → URL-Based State (nuqs / useSearchParams)
    No → Is it server data?
      Yes → Server State (React Query / SWR)
      No → Global Client State (Zustand)
```

---

### 10.1 Component-Level State (Local)

**Use:** UI state that doesn't leave the component tree — toggles, form inputs, hover states, accordion open/close.

```typescript
// Simple toggle
const [isOpen, setIsOpen] = useState(false);

// Complex local state — useReducer
type DialogState =
  | { phase: 'closed' }
  | { phase: 'confirming'; itemId: string }
  | { phase: 'deleting'; itemId: string };

type DialogAction =
  | { type: 'open'; itemId: string }
  | { type: 'confirm' }
  | { type: 'close' };

function dialogReducer(state: DialogState, action: DialogAction): DialogState {
  switch (action.type) {
    case 'open': return { phase: 'confirming', itemId: action.itemId };
    case 'confirm':
      return state.phase === 'confirming'
        ? { phase: 'deleting', itemId: state.itemId }
        : state;
    case 'close': return { phase: 'closed' };
  }
}

// Rules:
// ✅ Colocate state as close to usage as possible
// ✅ Lift only when a sibling needs the same state
// ❌ NEVER put ephemeral UI state in Zustand
```

---

### 10.2 URL-Based State (Shared/Global)

**Use:** Filters, search queries, pagination, tab selections, sort order — anything that should survive a page refresh or be shareable via link.

**Library:** `nuqs` (type-safe URL search params for Next.js App Router)

```typescript
// src/hooks/use-product-filters.ts
import { parseAsString, parseAsInteger, parseAsArrayOf, useQueryStates } from 'nuqs';

const productFilterParsers = {
  q: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  category: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsString.withDefault('createdAt_desc'),
};

export function useProductFilters() {
  return useQueryStates(productFilterParsers, {
    shallow: false,   // triggers Server Component re-fetch
    history: 'push',  // adds browser history entry
  });
}

// Usage in component:
const [filters, setFilters] = useProductFilters();
setFilters({ page: 1, category: ['electronics'] });

// Server Component — read URL params directly
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;  // Next.js 16: Promise
  const products = await productService.list({
    query: params.q ?? '',
    page: Number(params.page ?? 1),
  });
  return <ProductGrid products={products} />;
}
```

---

### 10.3 Global Client State

**Use:** Auth UI state (sidebar open, theme, notifications), shopping cart, multi-step wizard state, cross-component communication where URL is inappropriate.

**Library:** Zustand

```typescript
// src/stores/ui.store.ts
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: UIState['theme']) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
}

export const useUIStore = create<UIState & UIActions>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set) => ({
          sidebarOpen: true,
          theme: 'system',
          notifications: [],

          toggleSidebar: () => set((state) => { state.sidebarOpen = !state.sidebarOpen; }),
          setSidebarOpen: (open) => set((state) => { state.sidebarOpen = open; }),
          setTheme: (theme) => set((state) => { state.theme = theme; }),
          addNotification: (notification) => set((state) => {
            state.notifications.push({ ...notification, id: crypto.randomUUID() });
          }),
          dismissNotification: (id) => set((state) => {
            state.notifications = state.notifications.filter((n) => n.id !== id);
          }),
        }))
      ),
      { name: 'ui-store', partialize: (state) => ({ theme: state.theme }) }
    )
  )
);

// Selector pattern — prevents unnecessary re-renders
export const useSidebarOpen = () => useUIStore((s) => s.sidebarOpen);
export const useTheme = () => useUIStore((s) => s.theme);

// Rules:
// ✅ One store per domain (ui, cart, wizard — never one mega-store)
// ✅ Always use selector functions to subscribe to slices
// ✅ Use immer middleware for complex nested updates
// ✅ Persist only serializable, non-sensitive state
// ❌ NEVER store server data (API responses) in Zustand — use React Query
// ❌ NEVER store auth tokens in Zustand
```

---

### 10.4 Server State & Caching

**Use:** All server data — API responses, database queries, paginated lists, user profiles.

**Library:** TanStack Query v5 (React Query) for client-side, Next.js `cache()` + `fetch()` for server-side.

```typescript
// src/lib/query-client.ts — singleton
import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,          // 1 minute
        gcTime: 5 * 60 * 1000,         // 5 minutes
        retry: (failureCount, error) => {
          if (error instanceof UnauthorizedError) return false;
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: (error) => { globalErrorHandler(error); },
      },
    },
  });
}

// src/lib/query-keys.ts — centralized key factory
export const queryKeys = {
  all: ['root'] as const,
  products: {
    all: () => ['products'] as const,
    list: (filters: ProductFilters) => ['products', 'list', filters] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
  },
  users: {
    all: () => ['users'] as const,
    me: () => ['users', 'me'] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
} as const;

// src/hooks/queries/use-products.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.list(filters),
    placeholderData: (prev) => prev,  // v5: keeps previous data during refetch
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
  });
}

// Prefetch in Server Components (hybrid pattern)
// src/app/products/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { makeQueryClient } from '@/lib/query-client';

export default async function ProductsPage() {
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.list({}),
    queryFn: () => productService.list({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsClient />
    </HydrationBoundary>
  );
}
```

---

## 11. Service Layer Architecture

### Single Responsibility Principle

Each service file handles **exactly one domain entity or concern**. Services are the only place that calls external APIs, databases, or performs business logic.

```
src/
  services/
    product.service.ts      ← CRUD + business rules for products
    user.service.ts         ← User management, profile operations
    auth.service.ts         ← Session helpers, token ops (wraps Auth.js)
    order.service.ts        ← Order lifecycle
    email.service.ts        ← Email delivery (wraps Resend/SendGrid)
    upload.service.ts       ← File storage operations
    analytics.service.ts    ← Event tracking (wraps PostHog/Plausible)
    payment.service.ts      ← Payment processing (wraps Stripe)
    cache.service.ts        ← Redis/Upstash abstraction
    notification.service.ts ← In-app notification delivery
```

### Service Template

```typescript
// src/services/product.service.ts
import { cache } from 'react';
import { db } from '@/lib/db';
import { ProductSchema, type Product, type CreateProductInput } from '@/schemas/product.schema';
import { ServiceError } from '@/lib/errors';

export const productService = {
  /**
   * Get all products matching filters.
   * Cached per request via React cache().
   */
  list: cache(async (filters: ProductFilters): Promise<PaginatedResult<Product>> => {
    const results = await db.product.findMany({
      where: buildProductWhere(filters),
      orderBy: buildOrderBy(filters.sort),
      skip: (filters.page - 1) * filters.pageSize,
      take: filters.pageSize,
    });
    return {
      data: results.map((r) => ProductSchema.parse(r)),
      total: await db.product.count({ where: buildProductWhere(filters) }),
      page: filters.page,
      pageSize: filters.pageSize,
    };
  }),

  /**
   * Get a single product by ID.
   */
  getById: cache(async (id: string): Promise<Product> => {
    const result = await db.product.findUnique({ where: { id } });
    if (!result) throw new ServiceError('NOT_FOUND', `Product ${id} not found`);
    return ProductSchema.parse(result);
  }),

  /**
   * Create a new product.
   */
  create: async (input: CreateProductInput): Promise<Product> => {
    const result = await db.product.create({ data: input });
    return ProductSchema.parse(result);
  },

  /**
   * Update an existing product.
   */
  update: async (id: string, input: Partial<CreateProductInput>): Promise<Product> => {
    const result = await db.product.update({ where: { id }, data: input });
    return ProductSchema.parse(result);
  },

  /**
   * Soft-delete a product.
   */
  delete: async (id: string): Promise<void> => {
    await db.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
};

// Rules:
// ✅ Services return domain types (validated through Zod schemas)
// ✅ Services throw typed ServiceErrors — never raw DB errors
// ✅ Services are plain objects (no class instances)
// ✅ Wrap read operations in React cache() for request deduplication
// ❌ NEVER import services in client components directly — use API routes or Server Actions
// ❌ NEVER put UI logic in services
// ❌ NEVER call one service from another (use shared utils instead)
```

### API Route Convention

```typescript
// src/app/api/products/route.ts — collection
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const filters = ProductFiltersSchema.parse(Object.fromEntries(searchParams));
  const result = await productService.list(filters);
  return Response.json(result);
}

export async function POST(request: Request): Promise<Response> {
  const session = await auth();
  if (!session) return new Response('Unauthorized', { status: 401 });

  const body = await request.json();
  const input = CreateProductSchema.safeParse(body);
  if (!input.success) return Response.json(input.error.flatten(), { status: 400 });

  const product = await productService.create(input.data);
  return Response.json(product, { status: 201 });
}

// src/app/api/products/[id]/route.ts — resource
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await productService.getById(id);
  return Response.json(product);
}
```

---

## 12. Accessibility (WCAG AA / AXE / SonarQube)

### Non-Negotiable Requirements

```
✅ All WCAG 2.2 Level AA success criteria
✅ AXE-core: zero violations (run in Playwright tests)
✅ SonarQube: zero accessibility issues (A-rated)
✅ Keyboard navigation: all interactive elements reachable + operable
✅ Screen reader: tested with NVDA (Win) and VoiceOver (Mac)
✅ Color contrast: 4.5:1 for normal text, 3:1 for large text/UI components
✅ Focus visible: custom :focus-visible styles on all interactive elements
✅ Reduced motion: all animations gated on prefers-reduced-motion
```

### Required Patterns

```tsx
// 1. Semantic HTML — always use the correct element
<button onClick={handleClick}>      ✅ Clickable action
<a href="/about">                   ✅ Navigation
<nav aria-label="Main navigation">  ✅ Landmark
<main>                              ✅ Main content
<aside>                             ✅ Supplementary
<article>                           ✅ Self-contained content
<section aria-labelledby="section-id"> ✅ Labeled section

// 2. Images — always meaningful or decorative
<Image alt="Product photo of blue sneaker" />   ✅ Meaningful
<Image alt="" aria-hidden="true" />              ✅ Decorative

// 3. Form accessibility
<FormItem>
  <FormLabel htmlFor="email">Email address</FormLabel>
  <FormControl>
    <Input
      id="email"
      type="email"
      autoComplete="email"
      aria-required="true"
      aria-describedby="email-hint email-error"
    />
  </FormControl>
  <p id="email-hint" className="text-muted-foreground text-sm">
    We'll never share your email.
  </p>
  <FormMessage id="email-error" role="alert" />   // Live region for errors
</FormItem>

// 4. Dialogs
<Dialog>
  <DialogContent
    aria-labelledby="dialog-title"
    aria-describedby="dialog-desc"
  >
    <DialogHeader>
      <DialogTitle id="dialog-title">Confirm deletion</DialogTitle>
      <DialogDescription id="dialog-desc">
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    // Focus is trapped inside by shadcn/ui's Radix primitive ✅
  </DialogContent>
</Dialog>

// 5. Loading states
<div
  role="status"
  aria-label="Loading products"
  aria-live="polite"
>
  <Skeleton aria-hidden="true" />
</div>

// 6. Dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// 7. Icon buttons — always label them
<Button variant="ghost" size="icon" aria-label="Close dialog">
  <X aria-hidden="true" />
</Button>

// 8. Skip navigation
// In root layout — first interactive element
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
>
  Skip to main content
</a>
```

### SonarQube Rules (enforced in CI)

```
# These rules MUST be zero violations:
Web:S1082   — onclick should have associated keyboard event
Web:S1090   — img should have alt
Web:S1436   — tabIndex > 0 forbidden
Web:S2786   — label must be associated with a control
Web:S4084   — aria-* attributes must be valid
Web:S5850   — form inputs must have accessible names
Web:S1858   — headings must not be empty
```

### AXE Integration (Playwright)

```typescript
// tests/a11y/homepage.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

---

## 13. File & Folder Conventions

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group: auth pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/              # Route group: protected pages
│   │   ├── dashboard/
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/
│   │   └── products/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── global-error.tsx
│
├── components/
│   ├── ui/                       # shadcn/ui primitives (DO NOT EDIT BUSINESS LOGIC)
│   ├── layouts/                  # Layout wrappers (Sidebar, Header, Footer)
│   ├── forms/                    # Form components
│   ├── data-display/             # Tables, cards, lists
│   └── [feature]/                # Feature-scoped components
│
├── hooks/                        # Custom React hooks
│   ├── queries/                  # React Query hooks
│   └── use-*.ts
│
├── services/                     # Service layer (server-only)
├── stores/                       # Zustand stores (client-only)
├── schemas/                      # Zod schemas + inferred types
├── lib/                          # Framework utilities
│   ├── auth.ts
│   ├── db.ts
│   ├── errors.ts
│   ├── motion.ts                 # Animation presets
│   ├── query-client.ts
│   ├── query-keys.ts
│   └── utils.ts                  # cn() etc
├── actions/                      # Server Actions
├── types/                        # Shared TypeScript types
└── config/                       # App configuration constants
```

---

## 14. Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Component file | `kebab-case.tsx` | `product-card.tsx` |
| Component export | `PascalCase` | `ProductCard` |
| Hook file | `use-kebab-case.ts` | `use-product-search.ts` |
| Hook export | `camelCase` | `useProductSearch` |
| Service file | `kebab-case.service.ts` | `product.service.ts` |
| Service export | `camelCase` (object) | `productService` |
| Store file | `kebab-case.store.ts` | `ui.store.ts` |
| Store hook | `use[Name]Store` | `useUIStore` |
| Schema file | `kebab-case.schema.ts` | `product.schema.ts` |
| Schema export | `PascalCase + Schema` | `ProductSchema` |
| Type/Interface | `PascalCase` | `ProductFilters` |
| Action file | `kebab-case.actions.ts` | `product.actions.ts` |
| Action export | `camelCase` verb-noun | `createProduct`, `deletePost` |
| Route segment | `kebab-case` | `product-categories/` |
| Env variable | `SCREAMING_SNAKE_CASE` | `NEXT_PUBLIC_API_URL` |
| CSS custom property | `--kebab-case` | `--color-primary` |
| Test file | `*.spec.ts` or `*.test.ts` | `product-card.spec.tsx` |

---

## 15. Testing Requirements

### Coverage Minimums

| Type | Tool | Minimum |
|---|---|---|
| Unit | Vitest + RTL | 80% coverage |
| Integration | Vitest | Key service flows |
| E2E | Playwright | All critical user journeys |
| Accessibility | Playwright + axe-core | 100% pages zero violations |
| Visual | Playwright screenshots | Core layouts |

### Testing Rules

```typescript
// ✅ Test behavior, not implementation
test('shows error when email is invalid', async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText('Email'), 'notanemail');
  await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(screen.getByRole('alert')).toHaveTextContent('Valid email required');
});

// ✅ Use RTL queries in accessibility-priority order:
// getByRole > getByLabelText > getByPlaceholderText > getByText > getByTestId

// ✅ Mock at the service boundary, not the DB
vi.mock('@/services/product.service', () => ({
  productService: { list: vi.fn().mockResolvedValue(mockProducts) },
}));

// ❌ NEVER use snapshot tests for business logic
// ❌ NEVER use getByTestId unless absolutely no semantic alternative
```

---

## 16. Performance Budget

| Metric | Target | Hard Limit |
|---|---|---|
| LCP | < 2.0s | 2.5s |
| FID / INP | < 100ms | 200ms |
| CLS | < 0.05 | 0.1 |
| FCP | < 1.2s | 1.8s |
| TTFB | < 200ms | 400ms |
| JS Bundle (initial) | < 80kb gz | 120kb gz |
| Image (hero) | WebP / AVIF only | — |

```typescript
// Bundle analysis — run before every release
// package.json:
// "analyze": "ANALYZE=true next build"

// Code splitting — dynamic import for heavy components
const HeavyChart = dynamic(() => import('@/components/charts/heavy-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,  // if browser-only
});

// Prefetch critical routes
import { prefetchQuery } from '@tanstack/react-query';
// In layout or navigation: router.prefetch('/dashboard')
```

---

## 17. Security Requirements

```typescript
// Content Security Policy — next.config.ts
const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-{NONCE}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  connect-src 'self' https://api.anthropic.com;
  frame-ancestors 'none';
`;

// Input validation — ALL user input through Zod before use
// SQL injection — never raw queries; all DB access is via the Entity Framework backend API
// XSS — never dangerouslySetInnerHTML (ESLint rule enforced)
// CSRF — Server Actions use built-in Next.js CSRF protection
// Secrets — NEVER in client bundles (no NEXT_PUBLIC_ for secrets)
// Rate limiting — apply to all API routes and Server Actions
// Headers — security headers via next.config.ts headers()

// ❌ NEVER:
// dangerouslySetInnerHTML
// eval() or new Function()
// document.write()
// Inline event handlers in JSX (onClick="..." — not a React pattern but flag it)
// process.env.SECRET_KEY in client code
```

---

## 18. Error Handling

```typescript
// src/lib/errors.ts
export class ServiceError extends Error {
  constructor(
    public readonly code: 'NOT_FOUND' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'VALIDATION' | 'INTERNAL',
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

// Server Action result type
export type ActionResult<T = void> =
  | { status: 'success'; data?: T }
  | { status: 'error'; message: string; errors?: Record<string, string[]> };

// API route — always return typed error responses
function handleError(error: unknown): Response {
  if (error instanceof ServiceError) {
    const statusMap: Record<ServiceError['code'], number> = {
      NOT_FOUND: 404,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      VALIDATION: 400,
      INTERNAL: 500,
    };
    return Response.json(
      { error: error.message, code: error.code },
      { status: statusMap[error.code] },
    );
  }
  console.error('Unexpected error:', error);
  return Response.json({ error: 'Internal server error' }, { status: 500 });
}

// Error boundary — error.tsx
'use client';
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error tracking (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

---

## 19. Environment & Configuration

```bash
# .env.local (never commit)
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."                          # openssl rand -base64 32
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
REDIS_URL="..."

# .env.local (safe for client — NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_POSTHOG_KEY="..."
```

```typescript
// src/config/env.ts — validated env at startup
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = EnvSchema.parse(process.env);
// Throw at startup if env is misconfigured — fail fast
```

---

## 20. CI/CD Conventions

```yaml
# .github/workflows/ci.yml — required checks (all must pass to merge)
jobs:
  quality:
    steps:
      - typecheck        # tsc --noEmit
      - lint             # eslint + prettier check
      - sonarqube        # zero critical/blocker issues
      - test:unit        # vitest --coverage (min 80%)
      - test:e2e         # playwright (including axe checks)
      - build            # next build (zero errors)
      - bundle-analysis  # enforce performance budget
```

**Branch strategy:**
```
main         ← production (protected, requires PR + passing CI)
develop      ← integration branch
feature/*    ← feature branches (from develop)
fix/*        ← bug fixes
chore/*      ← maintenance
```

**Commit format:** Conventional Commits
```
feat(products): add category filter to product list
fix(auth): resolve token refresh race condition
chore(deps): upgrade motion to 12.38.x
```

---

## 21. AI Assistant Directives

When generating or modifying code in this project:

```
✅ ALWAYS read the relevant CLAUDE.md (this file + subdirectory) before generating code
✅ ALWAYS use TypeScript with strict settings — no implicit any
✅ ALWAYS validate external data with Zod before use
✅ ALWAYS use Server Components by default — add 'use client' only when required
✅ ALWAYS follow the State Management Decision Matrix (Section 10)
✅ ALWAYS check prefers-reduced-motion for Motion animations
✅ ALWAYS add aria-* attributes, roles, and labels for accessibility
✅ ALWAYS write named exports (except page.tsx / layout.tsx)
✅ ALWAYS use the service layer — never query the DB in components
✅ ALWAYS use React Query for client-side server state
✅ ALWAYS return typed ActionResult from Server Actions

❌ NEVER generate Class Components
❌ NEVER use `any` type
❌ NEVER use non-null assertion (!)
❌ NEVER use enum — use const object + typeof pattern
❌ NEVER store server data in Zustand
❌ NEVER use dangerouslySetInnerHTML
❌ NEVER import services in client components
❌ NEVER skip error boundaries on async boundaries
❌ NEVER commit secrets or API keys
❌ NEVER create a component without considering its accessibility
❌ NEVER use <img> — use next/image always
❌ NEVER use framer-motion — use motion (motion/react)
❌ NEVER upgrade pinned package versions without a migration ticket
❌ NEVER hardcode data that belongs in a data source — departments, tools, services, content, and
   any list a non-developer might need to edit MUST live in /data/*.json files (current standard)
   or a database (Supabase — long-term standard). TypeScript source files are not a data layer.
❌ NEVER modify CSS or Tailwind classes that the user has written themselves unless explicitly asked
   to change styling. Treat user-authored styles as intentional design decisions.
```

### Data Source Rule (NON-NEGOTIABLE)

Any list, registry, or content that could change without a code change — tools, departments,
services, pricing, FAQs, team members, etc. — MUST NOT be hardcoded in TypeScript source files.

**Current standard:** `/data/*.json` files, imported via `import data from '@/data/file.json'`
**Long-term standard:** Supabase tables, fetched server-side in Server Components or services

If you find hardcoded data arrays in `.ts` / `.tsx` files, move them to `/data/` before touching
anything else in that area. Flag any you cannot move as **HARDCODED — needs migration** in your
response.

---

*Last updated: 2026-04-24 | Stack: Next.js 16.2 / React 19.2 / TypeScript 5 / Tailwind 4 / shadcn/ui 4.1 / Motion 12.38 / Entity Framework (C# .NET backend on Railway)*
*Owner: [PROJECT_LEAD] | Review cycle: Quarterly or on major version bump*
# CLAUDE.md — Project Master Rules

> This file defines the rules Claude Code must follow across all projects.
> For project-specific overrides, create a `CLAUDE.local.md` in the project root.

---

## 1. Tech Stack (Fixed)

| Layer           | Technology                                         |
| --------------- | -------------------------------------------------- |
| Framework       | Next.js 15 (App Router)                            |
| Language        | TypeScript (strict mode)                           |
| Styling         | Tailwind CSS                                       |
| Backend / DB    | Supabase (Auth, Database, Storage, Edge Functions) |
| Package Manager | npm                                                |
| OS              | macOS                                              |

- Always keep `"strict": true` in `tsconfig.json`.
- Never use the `any` type. Use `unknown` with type guards when unavoidable.
- Default to Server Components. Only use Client Components (`"use client"`) when interactivity is required.
- Separate Supabase clients into `lib/supabase/server.ts` and `lib/supabase/client.ts`.

---

## 2. Project Structure

```
src/
├── app/                    # Next.js App Router (pages, layouts, API routes)
│   ├── (auth)/             # Auth route group
│   ├── (dashboard)/        # Dashboard route group
│   ├── api/                # Route Handlers
│   ├── layout.tsx          # Root Layout
│   └── page.tsx            # Home
├── components/
│   ├── ui/                 # Reusable atomic UI components (Button, Input, Card …)
│   ├── layout/             # Layout components (Header, Footer, Sidebar)
│   └── features/           # Feature components with business logic
├── lib/
│   ├── supabase/           # Supabase clients (server.ts, client.ts, middleware.ts)
│   ├── utils.ts            # Shared utility functions
│   └── constants.ts        # Constants
├── types/                  # Global TypeScript types and interfaces
├── hooks/                  # Custom React Hooks
└── styles/
    └── globals.css         # Tailwind directives + custom CSS variables
```

### Naming Conventions

- **Files**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions / Variables**: camelCase (`getUserData`)
- **Types / Interfaces**: PascalCase, no `I` prefix (`UserProfile`, not `IUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Supabase tables**: snake_case (`user_profiles`)

---

## 3. Design System — Anti-Generic Rules

> **Core principle: Never produce designs that look "AI-generated" or generic.**

### 3-1. Color

- **Never** use default Tailwind palette colors (blue-500, indigo-600, etc.) as the primary color.
- Define custom brand colors in `tailwind.config.ts` under `extend.colors`.
- Create semantic color tokens with CSS variables:
  ```css
  :root {
    --color-primary: #...;
    --color-primary-hover: #...;
    --color-surface: #...;
    --color-surface-elevated: #...;
    --color-text-primary: #...;
    --color-text-secondary: #...;
  }
  ```
- One bold accent color + neutral tones beats a washed-out evenly-distributed palette.

### 3-2. Typography

- **Never** use the same font for headings and body. Pair a display/serif font with a clean sans-serif.
- Apply tight tracking (`tracking-tight` or `-0.03em`) on large headings and generous line-height (`leading-relaxed` or `1.7`) on body text.
- **Never** use Inter, Roboto, or Arial as the primary font. Choose distinctive fonts from Google Fonts.
- Try a different font pairing for every project. Do not converge on the same fonts.

### 3-3. Shadows & Depth

- **Never** use flat shadows like `shadow-md`.
- Use layered, color-tinted shadows with low opacity:
  ```css
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06),
    0 12px 32px rgba(var(--shadow-color), 0.08);
  ```
- Apply a surface layering system: Base → Elevated → Floating. Not everything at the same z-plane.

### 3-4. Animation

- **Never** use `transition-all`. Always specify exact properties: `transition-transform`, `transition-opacity`, etc.
- Only animate `transform` and `opacity` (GPU-accelerated, no reflow).
- Use spring-style easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- A well-orchestrated page load with staggered reveals (`animation-delay`) is more impactful than scattered micro-interactions.

### 3-5. Interactive States

- Every clickable element **must** have `hover`, `focus-visible`, and `active` states. No exceptions.
- Customize `focus-visible` outline styles for keyboard accessibility.

### 3-6. Images

- Add a gradient overlay on images (`bg-gradient-to-t from-black/60`).
- Apply color treatment with `mix-blend-multiply`.
- Always use the Next.js `<Image />` component (`width` + `height` or `fill` required).

### 3-7. Spacing

- Use consistent spacing tokens. Do not scatter arbitrary Tailwind values (`p-[13px]`).
- Apply unified rules for section gaps, card padding, etc.

### 3-8. Backgrounds & Atmosphere

- Do not stop at solid backgrounds (`bg-white`, `bg-gray-50`).
- Create depth with gradient meshes, SVG noise textures, geometric patterns, or layered transparencies.

### 3-9. Responsive

- **Mobile-first**. Base styles target mobile; scale up with `md:`, `lg:`, etc.
- Every page must work from 320px to 1440px without breaking.

---

## 4. Visual QA — Screenshot Comparison Workflow

> Design quality is verified visually, not just through code review.

### When a reference image is provided:

1. Match the reference's layout, spacing, typography, and color **exactly**. Do not "improve" it.
2. After implementation, **take a screenshot** of the running page (`localhost`).
3. Compare the screenshot against the reference. Be specific about mismatches:
   - "Heading is ~32px but reference shows ~24px"
   - "Card gap is 16px but should be ~24px"
   - "Border radius is too sharp compared to reference"
4. Fix mismatches, re-screenshot, and compare again.
5. Do **at least 2 comparison rounds**. Stop only when no visible differences remain or the user says so.

### When no reference image is provided:

1. Design from scratch following the Anti-Generic Rules (Section 3).
2. After implementation, **take a screenshot** to self-review.
3. Check: Does it look distinctive? Does it follow the design rules? Would a human designer be proud of this?
4. Iterate if needed.

### Checklist for every screenshot review:

- [ ] Spacing and padding consistency
- [ ] Font size, weight, and line-height
- [ ] Colors match (exact hex values if reference exists)
- [ ] Alignment and grid structure
- [ ] Border-radius and shadows
- [ ] Image sizing and aspect ratios
- [ ] Interactive states (hover, focus) if applicable
- [ ] Mobile responsiveness

---

## 5. Code Quality Rules

### 5-1. Component Patterns

```tsx
// ✅ Good
"use client";

import { useState } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
}: ButtonProps) {
  // ...
}
```

- Always define props with an interface.
- Set defaults via destructuring.
- Prefer **named exports** over `export default`.

### 5-2. Error Handling

```tsx
// Wrap every server action and API call with try-catch
export async function fetchUserData(userId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("[fetchUserData]", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

- Always check the `error` field from Supabase responses.
- Include the **function name as a tag** (`[fetchUserData]`) in error logs for easier debugging.
- Separate user-facing errors from developer-facing errors.

### 5-3. Next.js Patterns

- **Server Actions**: Place in `app/actions/` with `"use server"` directive.
- **Loading UI**: Implement skeleton UI via `loading.tsx`.
- **Error Boundary**: Implement error fallback via `error.tsx`.
- **Metadata**: Set `generateMetadata` or static `metadata` on every page.

---

## 6. Error Recovery & Self-Improvement Loop

> Every failure is a chance to make the system stronger.

**When an error occurs, follow this sequence:**

1. **Read the full error message and stack trace.** Do not guess.
2. **Identify the root cause** — fix the cause, not the symptom.
3. **Fix and verify:**
   ```bash
   npm run build    # Check for build errors
   npm run lint     # Check for lint errors
   ```
4. **Prevent recurrence:**
   - Recurring issue → Abstract into a utility function or custom hook
   - External API constraint (rate limits, etc.) → Document in code comments
   - Type-related → Add types to `types/` directory

**Never run commands that consume paid API credits without asking the user first.**

---

## 7. Git Commit Convention

```
<type>: <description>

type = feat | fix | refactor | style | docs | chore | test
```

Examples:

- `feat: implement user profile page`
- `fix: resolve Supabase RLS policy causing data fetch failure`
- `style: improve hero section entrance animation`

---

## 8. Environment Variables

- Store in `.env.local` (not `.env`).
- **Never hardcode secrets in source code. Ever.**
- Supabase key naming:
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=     # Server-only, never prefix with NEXT_PUBLIC_
  ```

---

## 9. Brand Assets

- Always check `brand_assets/` or `public/brand/` before designing.
- If logos, color guides, or style guides exist, **use them**.
- Do not use placeholders when real assets are available.
- When no assets exist, use `https://placehold.co/WIDTHxHEIGHT`.

---

## 10. Workflow

1. **Check existing code first** — Before creating anything new, look in `components/`, `lib/`, and `hooks/` for reusable pieces.
2. **Work in small increments** — Implement one feature → verify → move to the next. No massive single commits.
3. **Never break the build** — Run `npm run build` after changes.
4. **Communicate** — When uncertain about design or feature decisions, ask the user rather than guessing.

---

## 11. Hard Rules (Never Do)

- ❌ Use the `any` type
- ❌ Use `transition-all`
- ❌ Use default Tailwind blue/indigo as the primary color
- ❌ Use Inter or Roboto as the primary font
- ❌ Leave `console.log` in production code
- ❌ Commit `.env.local`
- ❌ Overuse `export default` (prefer named exports)
- ❌ "Improve" a reference design without being asked
- ❌ Call paid APIs without user confirmation

#  Creative Landing Page

A high-performance, conversion-focused creative landing page built with React, TypeScript, Tailwind CSS, Framer Motion, and Three.js. Designed to turn visitors into clients through subtle interaction design, purposeful animation, and a refined visual language.

---

##  Live Demo

> (https://creat-liard.vercel.app/)

---

## Preview

> _Add screenshots or a GIF of the landing page here_

---

##  Features

- **Animated hero** with a lazy-loaded Three.js sphere background, deferred via `requestIdleCallback` to keep first paint fast
- **Scroll-driven card stack** with sticky positioning and spring-based smooth progress
- **Staggered section reveals** using `useInView` — animations only fire once, in view
- **Animated hamburger menu** with spring transitions, scroll lock, and a backdrop overlay
- **Testimonials carousel** with auto-play, pause-on-hover, directional slide animation, and a tabbed client list
- **Contact form** with field focus states, submission feedback, and an info panel
- **Dark mode** support throughout, driven by a `useDarkMode` hook that watches both `prefers-color-scheme` and the `<html>` class
- **Grain texture overlays** and shimmer sweep animations on cards for a tactile, premium feel
- **Fully responsive** — mobile-first layouts with breakpoint-specific behaviour across all sections
- **Keyboard accessible** nav items with `role`, `tabIndex`, and `onKeyDown` handlers

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animation | [Motion (Framer Motion)](https://motion.dev) |
| 3D | [Three.js](https://threejs.org) |
| Build | [Vite](https://vitejs.dev) |
| Icons | [Lucide React](https://lucide.dev) |

---

##  Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── nav/
│   │   │   ├── hamburger.tsx          # Animated mobile menu
│   │   │   ├── hamburger-backdrop.tsx # Overlay backdrop
│   │   │   ├── navItems.tsx           # Rolling text nav links
│   │   │   ├── constants.ts           # NAV_ITEMS data
│   │   │   ├── hooks/
│   │   │   │   └── useScrollLock.ts   # Body scroll lock
│   │   │   └── index.tsx
│   │   ├── featured/
│   │   │   └── gridblocks.tsx
│   │   └── section-wrapper.tsx        # Shared section spacing primitive
│   ├── sections/
│   │   ├── hero/
│   │   │   ├── hero.tsx               # Hero section + lazy 3D background
│   │   │   ├── hero-context.ts        # Context + useHeroContext hook
│   │   │   └── hero-content.tsx       # HeroProvider + HeroContent
│   │   ├── cardstack/
│   │   │   ├── cardstack.tsx          # Scroll-driven sticky card stack
│   │   │   ├── card.tsx
│   │   │   ├── stepIndicator.tsx
│   │   │   ├── cardData.ts
│   │   │   └── hooks/
│   │   │       └── useBreakpoint.ts
│   │   ├── featured/
│   │   │   └── featured.tsx
│   │   ├── services/
│   │   │   ├── services.tsx
│   │   │   ├── card.tsx
│   │   │   └── constant.ts
│   │   ├── work/
│   │   │   ├── work.tsx
│   │   │   ├── projectRow.tsx
│   │   │   ├── constant.ts
│   │   │   └── useTouch.ts
│   │   ├── testimonials/
│   │   │   ├── testimonials.tsx
│   │   │   ├── tablist.tsx
│   │   │   └── constants.ts
│   │   └── contact/
│   │       ├── contact.tsx
│   │       ├── inputForm.tsx
│   │       └── infoPanel.tsx
│   ├── spherebg.tsx                   # Three.js sphere (lazy loaded)
│   ├── card.tsx                       # Shared card primitive
│   ├── btn.tsx                        # Shared button
│   └── ui/
│       └── ...
├── hooks/
│   ├── themes.ts                      # useDarkMode
│   └── useBreakpoint.ts
├── utils/
│   └── index.ts                       # scrollToSection + helpers
└── constants/
    └── ...
```

---

##  Getting Started

### Prerequisites

- Node.js `>= 18`
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## ✦ Path Aliases

The project uses `@/` as an alias for `src/`:

```ts
// tsconfig.app.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

If you're adding a new bundler plugin or tool, make sure it also resolves `@/` — in Vite this is configured in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

---

## ✦ Dark Mode

Dark mode is controlled by the `dark` class on `<html>` and the `prefers-color-scheme` media query. The `useDarkMode` hook in `src/hooks/themes.ts` watches both simultaneously via a `MutationObserver` and a `matchMedia` listener, so it stays in sync whether the user toggles it manually or follows the OS setting.

To toggle dark mode, add or remove the `dark` class on `document.documentElement`.

---

## ✦ Animation Philosophy

All animations follow three rules:

1. **Purposeful** — every animation either communicates state (loading, success, transition) or guides the eye toward a conversion action. No animation is decorative only.
2. **Once** — `useInView` with `{ once: true }` means elements animate in on first scroll and stay visible. No re-triggering.
3. **Deferred** — the Three.js sphere is loaded via `requestIdleCallback` with a 2000ms timeout fallback, so it never blocks the critical render path.

---

## ✦ Performance Notes

- Three.js sphere is `lazy()`-imported and deferred with `requestIdleCallback`
- All `useInView` animations use `{ once: true }` — no re-renders on scroll out
- `useSpring` on scroll progress smooths the card stack without layout thrash
- Drag handlers in the testimonial stack are attached to `window`, not DOM nodes, preventing stuck drag states
- `useScrollLock` cleans up `body.style.overflow` on unmount to prevent permanent lock if the component is removed while open

---

## ✦ Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#hero` | Full-viewport intro with 3D background and CTA |
| About / Process | `#about` | Scroll-driven sticky card stack showing the work process |
| Featured | `#featured` | Feature grid highlighting core capabilities |
| Services | `#services` | Service cards with hover states |
| Work | `#work` | Expandable project rows with details |
| Testimonials | `#testimonials` | Auto-playing carousel with tabbed client list |
| Contact | `#contact` | Contact form with info panel |

---

## ✦ Customisation

### Updating nav links
Edit `src/components/layout/nav/constants.ts`:
```ts
export const NAV_ITEMS = [
  { label: "Work",         id: "work"         },
  { label: "Services",     id: "services"     },
  { label: "About",        id: "about"        },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact",      id: "contact"      },
];
```

### Adding a new section
1. Create `src/components/sections/your-section/your-section.tsx`
2. Wrap it in `<SectionWrapper id="your-section">` in your page file
3. Add a nav entry to `NAV_ITEMS` and a `scrollToSection` target

### Changing brand colours
All brand colours are Tailwind utilities. The primary accent is `amber-500`. To retheme, find-and-replace `amber` in the component files or extract to a Tailwind CSS variable in your `tailwind.config.ts`.

---

## ✦ Known Limitations

- The Three.js sphere has no reduced-motion fallback — consider checking `prefers-reduced-motion` and skipping the 3D load entirely for users who prefer it
- `OPEN_HEIGHT` in the hamburger is computed once at module load time using `window.innerHeight` — this won't update on resize or orientation change

---

## ✦ License

MIT — feel free to use, adapt, and build on this for your own projects.

---

## ✦ Author

> _Add your name, website, and contact here_
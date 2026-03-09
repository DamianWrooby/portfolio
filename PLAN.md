# Technologies Section Redesign Plan

## Goal
Replace the plain logo-list "Technologies" section with a "How I Build Software" capability section
using 3 animated skill cards, hover glow/scale effects, and updated copy in both EN and PL.

---

## User Choices
- **Layout**: 3 Skill Cards (Enterprise Frontend | Fullstack & APIs | AI & Product)
- **Interactivity**: CSS hover glow + scale (no extra JS)
- **Lottie animation**: Keep, moved below the card grid (centered)
- **Polish**: Full PL translations updated

---

## Files to Change

| File | Action |
|------|--------|
| `src/components/molecules/SkillCards/SkillCards.js` | **CREATE** — new molecule replacing TechnologiesList |
| `src/components/organisms/Technologies/Technologies.js` | **MODIFY** — new title, swap TechnologiesList → SkillCards, restructure layout |
| `src/components/molecules/TechnologiesList/TechnologiesList.js` | **KEEP** (not deleted — used nowhere else currently, but left for safety) |

---

## 1. New `SkillCards` Molecule

**File:** `src/components/molecules/SkillCards/SkillCards.js`

### Card Data (hardcoded, lang-aware)

**Card 1 – Enterprise Frontend Engineering**
- Icon: `🧠`
- EN description: "Building scalable, enterprise-ready SPAs with strong state management and performance focus."
- PL description: "Tworzenie skalowalnych, gotowych na środowisko produkcyjne aplikacji SPA z silnym zarządzaniem stanem."
- Bullets (EN):
  - Angular (3+ years, enterprise scale)
  - React / Next.js
  - NgRx / Redux state management
  - Component-driven architecture
  - Performance optimization & lazy loading
  - Unit & integration testing (Jasmine, Jest)
- Bullets (PL):
  - Angular (3+ lata, skala enterprise)
  - React / Next.js
  - NgRx / Redux – zarządzanie stanem
  - Architektura komponentowa
  - Optymalizacja wydajności i lazy loading
  - Testy jednostkowe i integracyjne (Jasmine, Jest)

**Card 2 – Fullstack & APIs**
- Icon: `⚙️`
- EN description: "Designing clean APIs and production-ready backend services."
- PL description: "Projektowanie czystych API i gotowych na produkcję serwisów backendowych."
- Bullets (EN):
  - Node.js (Express, NestJS)
  - REST API design
  - Prisma ORM + PostgreSQL
  - Firebase / Supabase
  - Auth flows & session handling
- Bullets (PL):
  - Node.js (Express, NestJS)
  - Projektowanie REST API
  - Prisma ORM + PostgreSQL
  - Firebase / Supabase
  - Uwierzytelnianie i zarządzanie sesjami

**Card 3 – AI & Product Engineering**
- Icon: `🤖`
- EN description: "Integrating AI capabilities into real-world products."
- PL description: "Integrowanie możliwości AI w rzeczywistych produktach."
- Bullets (EN):
  - OpenAI API integrations (GymCraft)
  - Prompt engineering for structured JSON outputs
  - PDF generation & export pipelines
  - Garmin Connect integration
  - Python microservice design
- Bullets (PL):
  - Integracje OpenAI API (GymCraft)
  - Prompt engineering dla ustrukturyzowanych odpowiedzi JSON
  - Generowanie i eksport PDF
  - Integracja Garmin Connect
  - Mikroserwisy w Pythonie

### Styled Components

```
CardsGrid      — CSS grid, 1-col → 2-col (md) → 3-col (lg)
Card           — darkBlue bg, subtle neon border, border-radius 8px
                 hover: transform scale(1.02) + box-shadow neon glow (0.3s ease)
CardHeader     — flex row, emoji + title (neonBlue, mainFont)
CardDescription — gray text, subFont, smaller font size
BulletList     — ul, no list-style
BulletItem     — li with neonBlue "→" prefix, white text
```

### GSAP Animation
- Re-use existing pattern: `gsap.from(card, { autoAlpha: 0, y: '-=30', scrollTrigger: { trigger: card, start: 'top bottom-=80px' } })` staggered via `forEach` with `useRef` on the grid.

---

## 2. Updated `Technologies` Organism

### Section header copy changes
| | EN | PL |
|--|--|--|
| Title | "How I Build Software" | "Jak buduję oprogramowanie" |
| Subtitle | "Frontend-focused product engineer with fullstack and AI integration experience." | "Inżynier produktu z doświadczeniem we frontendzie, fullstack i integracji AI." |

### Layout restructure
- **Remove** `flex-direction: row` on `xl` from `InnerWrapper` (currently it puts TechnologiesList + Lottie side-by-side).
- **New layout** in `Main`:
  1. `Separator`
  2. `SectionHeader`
  3. `SkillCards` (full-width responsive grid)
  4. `LottieWrapper` (centered below the cards, max-width ~500px, margin: 60px auto 0)
- This gives cards the full content width for 3 clean columns at lg+.

---

## 3. Branch & Git Operations

```
git checkout -b claude/redesign-tech-section-w90Pu   # or fetch if exists
# ... implement changes ...
git add src/components/molecules/SkillCards/SkillCards.js
git add src/components/organisms/Technologies/Technologies.js
git commit -m "redesign: replace Technologies list with How I Build Software skill cards

- Create SkillCards molecule with 3 capability areas
- EN/PL copy: Enterprise Frontend, Fullstack & APIs, AI & Product Engineering
- Hover glow + scale CSS transitions on cards
- GSAP scroll-trigger entrance animation
- Keep Lottie animation, repositioned below card grid
- Update section title/subtitle in both languages"
git push -u origin claude/redesign-tech-section-w90Pu
```

---

## What Does NOT Change
- File/component name `Technologies` (organism)
- Scroll anchor `id="technologies"` (nav links still work)
- `LottieAnimation` molecule (kept, just repositioned)
- `SectionHeader`, `Separator`, `Content` atoms
- `TechnologiesList` file (left in place, just unused)
- All other page/layout files

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run develop       # Start local dev server (gatsby develop)
npm run build         # Production build
npm run serve         # Serve production build locally
npm run clean         # Clear Gatsby cache (.cache and public/)

# Testing
npm test              # Run all Jest tests
npx jest path/to/test.js  # Run a single test file
npx jest --testNamePattern="test name"  # Run tests matching a name

# Code formatting
npm run format        # Prettier over all JS/TS/JSON/MD files
```

## Environment Setup

Requires `.env.development` and `.env.production` files with:
```
GATSBY_CONTENTFUL_ACCESS_TOKEN=...
```

Contentful space ID is `l8jq2db9qwuj` (hardcoded in `gatsby-config.js`).

## Architecture

### Content Source
All dynamic content (blog posts, projects, websites) is fetched from **Contentful** via `gatsby-source-contentful`. Pages query Contentful data using Gatsby's GraphQL layer. Firebase Firestore is used for blog post comments (real-time via `onSnapshot`).

### Routing & Internationalization
The site supports **English and Polish** (`src/consts/languages.js`). Pages are duplicated with language suffixes (e.g., `index.en.js`, `index.pl.js`, `blog.en.js`, `blog.pl.js`). Dynamic pages (blog posts, projects, websites, tags) are programmatically created in `gatsby-node.js` with paths like `/{language}/blog/{slug}`. The `lang` prop is threaded through page → organism components to render the correct copy.

### Component Structure (Atomic Design)
```
src/components/
  atoms/      # Button, Content, LanguageToggler, ListItem, Seo, Separator
  molecules/  # Filters, Footer, Forms, SectionHeader, TagCloud, TileElement, ToC, ...
  organisms/  # AboutMe, Blog, Comments, Contact, Header, Navigation, Projects, Technologies, Websites
```

### Layout & Theming
- `src/layouts/layout.js` — wraps everything in `ThemeProvider` + `GlobalStyle`
- `src/theme/mainTheme.js` — single theme object with colors, font sizes, breakpoints, and responsive media query helpers (`theme.mq.md`, etc.)
- Styled Components v6 is used throughout; `jest-styled-components` is used in tests

### Navigation State
`src/contexts/NavigationContext.js` uses GSAP ScrollTrigger to track the active nav link and header transparency as the user scrolls. Wrap pages in `<NavigationProvider>` to enable this.

### Blog Post Rendering
Blog post body comes from Contentful as raw Markdown stored in `post.text.text`. It is rendered with `react-markdown` + `remark-gfm` + `rehype-slug`. A table of contents (`ToC` component) is built by parsing headings from the raw Markdown string before rendering.

### Templates
`src/templates/` contains page templates for individual blog posts, projects, websites, and tag archive pages. These receive `slug` and `language` as Gatsby page context.

### Services
- `src/services/firebase.js` — Firebase app + Firestore `db` export used by the comments system
- `src/hooks/useFilter.js` — custom hook for filtering lists (used on blog/projects/websites listing pages)

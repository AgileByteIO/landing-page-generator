# Landing Page Generator - Project Documentation

## Overview
This is an Astro-based landing page generator that supports internationalization (i18n) and dynamic content loading from markdown files. The project uses Astro with React components for UI interactivity and follows a content-driven approach where landing page content is stored as markdown files.

## Technology Stack
- **Framework:** Astro ^6.0.4
- **UI Library:** React ^19.2.4
- **Styling:** Tailwind CSS (inferred from shaders and UI components)
- **TypeScript:** Strict mode enabled
- **Content Management:** Astro Content Collections
- **Internationalization:** Built-in language routing with `[lang]` parameter
- **Node Engine:** >=22.12.0

## Project Structure
```
landing-page-generator/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── action/         # Interactive components (buttons, language switcher)
│   │   ├── ui/             # Presentational components (Hero, Card, Grid, Carousel)
│   │   │   └── shaders/    # WebGL/shader-based visual effects
│   │   └── layouts/        # Page layouts
│   ├── content/            # Markdown content files (loaded from private/content via env)
│   ├── pages/              # Astro pages (routes)
│   │   ├── [lang]/         # Language-scoped pages
│   │   │   ├── index.astro # Home page
│   │   │   └── [...slug].astro # Dynamic content pages
│   │   └── index.astro     # Fallback/home page
│   └── content.config.ts   # Content collection configuration
├── private/                # Private content (not in git)
│   └── content/            # Markdown files for landing page content
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Key Features

### 1. Internationalization (i18n)
- Language routing via `[lang]` parameter in pages
- Supported languages: English (`en`) and German (`de`) (configurable in index.astro)
- Language switcher component (`LangSwitcher.tsx`)
- Content loaded per language from markdown files

### 2. Content-Driven Architecture
- Landing page content stored as markdown files in `private/content/`
- Astro Content Collections with schema validation
- Frontmatter support: title, description, pubDate, author
- Dynamic routing for content pages via `[...slug].astro`

### 3. Modern UI Components
- Reusable UI components built with React and TypeScript
- Interactive elements: buttons, language switcher, carousel
- Visual effects: shader-based backgrounds (grid pulse, wave patterns, particle fields, gradients)
- Responsive design principles

### 4. Developer Experience
- Fast refresh with Astro dev server
- TypeScript support throughout
- ESLint/Prettier configuration (inferred from .vscode directory)
- Optimized build process

## Content Structure
Markdown files in `private/content/` should follow this format:

```markdown
---
title: "Page Title"
description: "Page description for SEO and social sharing"
pubDate: 2024-01-15
author: "Author Name"
---

# Page Content

Your markdown content here...
```

## Setup and Development

### Prerequisites
- Node.js >=22.12.0
- npm or yarn or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# Visit http://localhost:4321
```

### Production Build
```bash
npm run build
# Outputs to ./dist/
```

### Preview Build
```bash
npm run preview
```

## Environment Variables
- `CONTENT_PATH`: Path to content directory (defaults to `./private/content`)

## Component Documentation

### UI Components
- **Hero.tsx**: Main hero section with title, description, and call-to-action
- **Card.tsx**: Reusable card component for features, pricing, etc.
- **Grid.tsx**: Responsive grid layout
- **Carousel.tsx**: Image/content carousel with navigation
- **FeatherIcon.astro**: Lightweight icon component using Feather icons

### Action Components
- **LangSwitcher.tsx**: Language selection dropdown with persistence
- **Button.astro**: Reusable button component with variants
- **ArrowIconButton.tsx**: Button with arrow icon for navigation

### Visual Effects (Shaders)
Located in `src/components/ui/shaders/`:
- `gridPulse.ts`: Animated grid background
- `wavePattern.ts`: Sine wave background animation
- `particleField.ts`: Interactive particle system
- `gradientFlow.ts`: Flowing gradient background
- `noise.ts`: Animated noise texture
- `useShader.ts`: Custom hook for shader integration

## Routing
- `/:lang/` - Home page for specific language
- `/:lang/:slug` - Dynamic content pages
- Fallback to English if language not supported

## Building for Production
The build process optimizes:
- HTML minification
- CSS purging (via Tailwind)
- JavaScript bundling and minification
- Image optimization
- Static asset hashing for cache busting

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License
MIT License - see LICENSE file for details
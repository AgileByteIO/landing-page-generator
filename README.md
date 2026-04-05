# Landing Page Generator

A modern, internationalized landing page generator built with Astro and React. Create beautiful, multilingual landing pages with ease using markdown content and reusable UI components.

## ✨ Features

- **🌍 Internationalization**: Built-in support for multiple languages (English/German by default)
- **📝 Content-Driven**: Edit landing page content in simple markdown files
- **⚡️ High Performance**: Astro's island architecture for zero-JS by default
- **🎨 Beautiful UI**: Reusable components with interactive elements and visual effects
- **🔧 Developer Friendly**: TypeScript support, fast refresh, excellent DX
- **📱 Responsive**: Works on all device sizes
- **🔒 Secure**: Content loaded from private directory (not exposed in git)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/AgileByteIO/landing-page-generator.git
cd landing-page-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your landing page.

## 📁 Project Structure

```
landing-page-generator/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── action/     # Interactive components (buttons, language switcher)
│   │   ├── ui/         # Presentational components (Hero, Card, Grid, etc.)
│   │   │   └── shaders/# WebGL-based visual effects
│   │   └── layouts/    # Page layouts
│   ├── content/        # Markdown content (symlinked or copied from private/content)
│   ├── pages/          # Astro pages (routes)
│   │   ├── [lang]/     # Language-scoped routes
│   │   │   ├── index.astro     # Home page
│   │   │   └── [...slug].astro # Dynamic content pages
│   │   └── index.astro # Fallback
│   └── content.config.ts # Content collection configuration
├── private/            # Private content (not committed)
│   └── content/        # Your markdown landing page content
├── public/             # Static assets (images, icons, etc.)
├── astro.config.mjs    # Astro configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 📝 Content Format

Create markdown files in `private/content/` with this frontmatter:

```markdown
---
title: "Your Landing Page Title"
description: "Description for SEO and social sharing"
pubDate: 2024-01-15
author: "Your Name"
---

# Main Heading

Your landing page content in markdown...
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start local development server at `http://localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview your production build locally |
| `npm run astro` | Run Astro CLI commands (check, add integrations, etc.) |

## 🧩 UI Components

### Layout Components
- `Layout.astro` - Base layout with SEO metadata

### Action Components
- `LangSwitcher.tsx` - Language selection dropdown
- `Button.astro` - Reusable button with variants
- `ArrowIconButton.tsx` - Navigation button with arrow icon

### UI Components
- `Hero.tsx` - Main hero section
- `Card.tsx` - Feature/pricing cards
- `Grid.astro` - Responsive grid layout
- `Carousel.tsx` - Image/content carousel
- `FeatherIcon.astro` - Lightweight icon component

### Visual Effects (Shaders)
- `gridPulse.ts` - Animated grid background
- `wavePattern.ts` - Sine wave animation
- `particleField.ts` - Interactive particles
- `gradientFlow.ts` - Flowing gradients
- `noise.ts` - Animated noise texture

## 🌐 Internationalization

The project supports multiple languages through:
1. Language-routed pages: `/en/` and `/de/` (configurable)
2. `LangSwitcher` component for user language selection
3. Content loaded per language from markdown files
4. Default language configurable in `src/pages/index.astro`

## 🧪 Testing & TDD Recommendations

For Test-Driven Development with this Astro/React project, I recommend:

### 1. Unit Testing with Vitest
```bash
npm install -D vitest @vitest/coverage-v8 happy-dom @testing-library/react @testing-library/jest-dom
```

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### 2. Component Testing Examples
Create `src/components/__tests__/` directory:

```typescript
// Hero.test.tsx
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
  test('renders title and description', () => {
    render(<Hero title="Test" description="Test description" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
```

### 3. End-to-End Testing with Playwright
```bash
npm install -D @playwright/test
npx playwright install
```

### 4. Visual Regression Testing
Consider Chromatic or Percy for visual testing of UI components.

### 5. Content Validation
Test markdown frontmatter validation using Astro's content collection schemas.

## 🔧 Configuration

### Astro Config (`astro.config.mjs`)
- Server settings
- Build options
- Integrations (React, MDX, Node adapter)
- Image optimization

### TypeScript Config (`tsconfig.json`)
- Strict type checking
- Path aliases
- Module resolution

### Content Config (`src/content.config.ts`)
- Collection definitions
- Schema validation with Zod
- Content path configuration

## 📦 Dependencies

### Core
- `astro` - The web framework
- `react` & `react-dom` - UI library
- `@astrojs/react` - React integration
- `@astrojs/mdx` - MDX support
- `@astrojs/node` - Server adapter

### Dev Dependencies (Recommended for TDD)
- `vitest` - Testing framework
- `@testing-library/react` - React testing utilities
- `@playwright/test` - E2E testing
- `eslint` & `prettier` - Code quality
- `typescript` - Type checking

## 🚀 Deployment

The project outputs static files to `./dist/` that can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- Any static hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes tests for new functionality.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- UI inspiration from modern landing page designs
- Shader effects inspired by creative coding communities

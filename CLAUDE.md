# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio/e-commerce website for **Group Arch**, a technology products retailer based in Argentina. Built with vanilla HTML, SCSS, and JavaScript — no framework or bundler.

## Commands

```bash
# Install dependencies (uses Dart Sass — run with --ignore-scripts on Node 22+)
npm install --ignore-scripts

# Compile SCSS to CSS (one-time)
npm run build-css

# Watch SCSS files and recompile on change (use during development)
npm run watch-css
```

There are no lint or test commands configured.

## Architecture

### Single-Page Application via Hash Routing

`index.html` is the sole HTML file. Navigation between sections (`#home`, `#about`, `#service`, `#portfolio`, `#contact`) is handled entirely in `js/scripts.js` — it listens to `hashchange` events and toggles `.active` on the target `<section>` with a CSS slide animation. There is no page reload; all five sections are always in the DOM.

### JavaScript Modules (loaded as plain `<script>` tags)

| File | Responsibility |
|---|---|
| `js/scripts.js` | Hash-based routing, mobile nav toggle, section transitions |
| `js/app.js` | Fetches `api/api.json`, renders product cards, manages shopping cart via `localStorage`, fires SweetAlert popups |
| `js/style-switcher.js` | Toggles between 5 color theme stylesheets and dark/light mode |

The scripts are independent and do not import from each other. They communicate only through the DOM and `localStorage`.

### SCSS Structure

`scss/main.scss` is the entry point and `@import`s all partials. Compiled output goes to `css/main.css`.

```
scss/
├── _base.scss          # CSS reset, CSS custom properties (color vars), body
├── _layout.scss        # Container, row grid, full-screen section rules
├── _components.scss    # Shared component styles
├── components/         # Button and jumbotron partials
├── _home.scss / _about.scss / _service.scss / _portfolio.scss / _contact.scss
└── _mediaqueries.scss  # Single breakpoint at 1200px
```

Color theming is done via CSS custom properties defined in `_base.scss` and overridden by five alternate stylesheets in `css/skins/`. Dark mode is toggled by adding/removing a `.dark` class on `<body>`.

### Data Layer

Product data lives in `api/api.json` — a static JSON file with 5 product objects. `app.js` fetches it with the Fetch API and renders cards dynamically. There is no backend.

## Key Conventions

- **Content language:** Spanish — all user-visible text, labels, and comments are in Spanish.
- **No modules/bundler:** JS files use `var`/`let`/`const` and browser globals; do not use `import`/`export` syntax.
- **CSS output is committed:** `css/main.css` is checked into git. Always run `npm run build-css` after editing any `.scss` file so the compiled output stays in sync.
- **Theme stylesheets are separate files:** The five skin files in `css/skins/` are standalone CSS files swapped via `<link rel="alternate stylesheet">` — they are not generated from SCSS.
- **Cart state:** The shopping cart is persisted to `localStorage` under the key used in `app.js`. Clearing `localStorage` resets the cart.

# WebBuilder Studio

![WebBuilder Studio in action](./screenshots/webbuilder-screenshot.png)

---

Webflow was costing me too much. I could have stopped there. I chose to look for an alternative instead.

While exploring open source tools, I discovered GrapesJS, a drag & drop visual editor engine I could run directly in VS Code. I decided to build my own tool around it, shaped exactly for the way I work.

WebBuilder Studio is my personal Webflow. It follows the same logic, the same naming conventions, the same Client First structure. But it is entirely mine, so I can make it do exactly what I need.

My workflow today: I ask Claude to generate a first version of a page using reference sites. The result is often solid, but generic. That is where WebBuilder Studio comes in. I import that base and rework it visually, component by component, until it becomes something clean and personal.

I built my own portfolio with this tool. What you see in the canvas in the screenshot above is my portfolio being edited inside WebBuilder Studio.

The tool is still in development. I have already built a Client First plugin (a button that automatically generates the correct section structure) and a basic animations plugin. Next steps: complex animations with GSAP, a CMS, and more optimisations over time.

WebBuilder Studio is not a product. It is a training ground as much as a working tool. I use it to build sites, to learn how to write clean code, and to understand what happens under the hood.

---

## Features

- Drag & drop visual editor (GrapesJS Studio SDK)
- Custom dark theme (violet/pink palette)
- Auto-save to a local JSON file via Next.js API
- Client First plugin: one click generates a properly named section structure
- Animations plugin (AOS + Animate.css, GSAP planned)
- Rich components: tables, Swiper carousels, galleries, accordions, Iconify icons, YouTube videos

## Stack

| Tool | Role |
|------|------|
| Next.js 16 | React framework (App Router) |
| GrapesJS Studio SDK | Visual editor engine |
| TypeScript | Type safety |
| Tailwind CSS 4 | Utility styles |

## Getting started

```bash
git clone https://github.com/oriane-nyikeine/webbuilder-studio.git
cd webbuilder-studio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The `DEMO_LOCALHOST_KEY` license key is provided by GrapesJS for local development only.

## Project structure

```
src/
├── app/
│   ├── api/project/     # Save API (GET / POST)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── StudioEditorWrapper.tsx   # Main editor
│   └── LoadingScreen.tsx
└── plugins/
    ├── clientFirstPlugin.ts      # Client First integration
    └── animationsPlugin.ts       # AOS animations
data/
└── portfolio.json                # Saved project (git-ignored)
```

---

**Oriane Nyikeine** · [LinkedIn](https://www.linkedin.com/in/oriane-nyikeine) · [GitHub](https://github.com/oriane-nyikeine)

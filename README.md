# WebBuilder Studio

A visual no-code web editor built on **GrapesJS Studio SDK**, **Next.js** and **TypeScript**.

A personal tool to design and assemble web pages directly in the browser, without writing HTML by hand — with auto-save, a custom dark theme, and **Client First** methodology support.

---

## Features

- Drag & drop visual editor (GrapesJS Studio SDK)
- Custom dark theme (violet/pink palette)
- Auto-save to a local JSON file via Next.js API
- Client First support — structured section insertion (Finsweet methodology)
- Animations plugin (AOS + Animate.css)
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

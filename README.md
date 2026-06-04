# WebBuilder Studio

Éditeur web visuel no-code construit sur **GrapesJS Studio SDK**, **Next.js** et **TypeScript**.

Un outil personnel pour concevoir et assembler des pages web directement dans le navigateur, sans écrire de HTML à la main — avec sauvegarde automatique, thème sombre personnalisé, et support de la méthodologie **Client First**.

---

## Fonctionnalités

- Éditeur visuel drag & drop (GrapesJS Studio SDK)
- Thème sombre sur mesure (palette violet/rose)
- Sauvegarde automatique dans un fichier JSON local via API Next.js
- Support Client First — insertion de sections structurées Finsweet
- Plugin d'animations (AOS + Animate.css)
- Composants riches : tableaux, carrousels Swiper, galeries, accordéons, icônes Iconify, vidéos YouTube

## Stack

| Outil | Rôle |
|-------|------|
| Next.js 16 | Framework React (App Router) |
| GrapesJS Studio SDK | Moteur d'édition visuelle |
| TypeScript | Typage |
| Tailwind CSS 4 | Styles utilitaires |

## Installation

```bash
git clone https://github.com/oriane-nyikeine/webbuilder-studio.git
cd webbuilder-studio
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

> La clé de licence `DEMO_LOCALHOST_KEY` est fournie par GrapesJS pour un usage en développement local uniquement.

## Structure

```
src/
├── app/
│   ├── api/project/     # API de sauvegarde (GET / POST)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── StudioEditorWrapper.tsx   # Éditeur principal
│   └── LoadingScreen.tsx
└── plugins/
    ├── clientFirstPlugin.ts      # Intégration Client First
    └── animationsPlugin.ts       # Animations AOS
data/
└── portfolio.json                # Projet sauvegardé
```

---

**Oriane Nyikeine** · [LinkedIn](https://www.linkedin.com/in/oriane-nyikeine) · [GitHub](https://github.com/oriane-nyikeine)

'use client';

import { useEffect, useState } from 'react';
import StudioEditor from '@grapesjs/studio-sdk/react';
import {
  tableComponent,
  listPagesComponent,
  fsLightboxComponent,
  lightGalleryComponent,
  swiperComponent,
  iconifyComponent,
  flexComponent,
  accordionComponent,
  canvasEmptyState,
  canvasFullSize,
  canvasGridMode,
  layoutSidebarButtons,
  youtubeAssetProvider,
} from '@grapesjs/studio-sdk-plugins';
import '@grapesjs/studio-sdk/style';
import { clientFirstPlugin, buildClientFirstHTML } from '@/plugins/clientFirstPlugin';
import { animationsPlugin } from '@/plugins/animationsPlugin';

const CF_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
  viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round">
  <rect x="3" y="3" width="18" height="5" rx="1"/>
  <rect x="3" y="10" width="18" height="7" rx="1"/>
  <rect x="3" y="19" width="18" height="2" rx="1"/>
</svg>`;

export default function StudioEditorWrapper() {
  const [ready, setReady] = useState(false);

  // Migration unique : localStorage → data/portfolio.json (si le fichier est vide)
  useEffect(() => {
    async function migrate() {
      try {
        const fileRes = await fetch('/api/project');
        const fileData = await fileRes.json();
        const isEmpty = !fileData || Object.keys(fileData).length === 0;

        if (isEmpty) {
          const raw = localStorage.getItem('gjsProject');
          if (raw) {
            await fetch('/api/project', {
              method: 'POST',
              body: raw,
              headers: { 'Content-Type': 'application/json' },
            });
            localStorage.removeItem('gjsProject');
          }
        }
      } catch (e) {
        console.warn('Migration échouée :', e);
      }
      setReady(true);
    }
    migrate();
  }, []);

  if (!ready) {
    return (
      <div style={{
        width: '100%', height: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0a0a14', color: '#cc0050',
        fontFamily: 'sans-serif', fontSize: 18,
      }}>
        Chargement du portfolio…
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <StudioEditor
        options={{
          licenseKey: 'DEMO_LOCALHOST_KEY',
          theme: 'light',
          customTheme: {
            default: {
              colors: {
                global: {
                  background1: 'rgba(20, 20, 30, 1)',
                  background2: 'rgba(15, 15, 25, 1)',
                  background3: 'rgba(10, 10, 20, 1)',
                  backgroundHover: 'rgba(30, 30, 50, 1)',
                  text: 'rgba(200, 200, 255, 1)',
                  border: 'rgba(50, 50, 100, 1)',
                  focus: 'rgba(255, 0, 100, 0.8)',
                  placeholder: 'rgba(120, 120, 180, 1)',
                },
                primary: {
                  background1: 'rgba(255, 0, 100, 1)',
                  background3: 'rgba(30, 30, 50, 1)',
                  backgroundHover: 'rgba(200, 0, 80, 1)',
                  text: 'rgba(255, 255, 255, 1)',
                },
                component: {
                  background1: 'rgba(0, 200, 255, 1)',
                  background2: 'rgba(0, 150, 200, 1)',
                  background3: 'rgba(30, 30, 50, 1)',
                  text: 'rgba(255, 255, 255, 1)',
                },
                selector: {
                  background1: 'rgba(255, 0, 100, 1)',
                  background2: 'rgba(255, 200, 220, 1)',
                  text: 'rgba(255, 255, 255, 1)',
                },
                symbol: {
                  background1: 'rgba(0, 255, 200, 1)',
                  background2: 'rgba(0, 200, 150, 1)',
                  background3: 'rgba(30, 30, 50, 1)',
                  text: 'rgba(255, 255, 255, 1)',
                },
              },
            },
          },

          // ── Stockage self-hosted : lit/écrit dans data/portfolio.json via l'API ──
          storage: {
            type: 'self',
            // Chargement : GET /api/project → { project: données }
            onLoad: async () => {
              const res = await fetch('/api/project');
              const data = await res.json();
              return { project: data };
            },
            // Sauvegarde : POST /api/project avec les données
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSave: async ({ project }: { project: any }) => {
              await fetch('/api/project', {
                method: 'POST',
                body: JSON.stringify(project),
                headers: { 'Content-Type': 'application/json' },
              });
            },
            autosaveChanges: 1,         // sauvegarde après chaque modification
            autosaveIntervalMs: 5000,   // + toutes les 5 secondes si des changements
          },

          project: {
            type: 'web',
            id: 'PORTEFOLIO_ORIANENKN',
          },
          identity: {
            id: 'O_NKN',
          },

          gjsOptions: {
            canvas: {
              styles: [
                'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
                'https://unpkg.com/aos@2.3.1/dist/aos.css',
              ],
              scripts: [
                'https://unpkg.com/aos@2.3.1/dist/aos.js',
              ],
            },
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          actions: ({ actions }: { actions: any[] }) => [
            ...actions,
            {
              id: 'cf-insert-section',
              tooltip: 'Client First — Insérer une section',
              icon: CF_ICON,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick: ({ editor }: { editor: any }) => {
                const input = window.prompt(
                  'Nom de la section Client First\n(ex : hero, features, pricing)',
                  'hero'
                );
                if (!input?.trim()) return;
                const slug = input.trim().toLowerCase().replace(/\s+/g, '-');
                editor.addComponents(buildClientFirstHTML(slug));
              },
            },
          ],

          plugins: [
            tableComponent.init({}),
            listPagesComponent.init({}),
            fsLightboxComponent.init({}),
            lightGalleryComponent.init({}),
            swiperComponent.init({}),
            iconifyComponent.init({}),
            flexComponent.init({}),
            accordionComponent.init({}),
            canvasEmptyState.init({}),
            canvasFullSize.init({}),
            canvasGridMode.init({}),
            layoutSidebarButtons.init({}),
            youtubeAssetProvider.init({}),
            clientFirstPlugin.init({}),
            animationsPlugin.init({}),
          ],
        }}
      />
    </div>
  );
}

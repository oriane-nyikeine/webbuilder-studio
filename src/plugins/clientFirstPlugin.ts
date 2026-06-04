// Plugin Client First — Finsweet
//
// Ce fichier a une seule responsabilité : fournir la logique métier
// du plugin Client First (la structure HTML à générer).
//
// L'UI (le bouton dans la toolbar) est gérée dans StudioEditorWrapper.tsx
// via le système de composants React du Studio SDK — c'est la bonne approche
// pour GrapesJS Studio SDK qui n'utilise pas editor.Panels pour sa toolbar.

// Structure HTML Client First.
// Exportée pour être utilisée directement dans le bouton React de la toolbar.
export function buildClientFirstHTML(sectionName: string): string {
  return `<section class="section_${sectionName}">
  <div class="padding-global">
    <div class="container-medium">
      <div class="padding-section-medium">
      </div>
    </div>
  </div>
</section>`;
}

// Le plugin enregistre la commande GrapesJS.
// Même si le bouton est en React, avoir une commande nommée est une bonne pratique :
// ça permet de déclencher l'action depuis d'autres endroits (raccourcis clavier, etc.)
export const clientFirstPlugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(_options: Record<string, unknown> = {}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function clientFirstPluginFn(editor: any) {
      editor.Commands.add('cf:insert-section', {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        run(ed: any) {
          const input = window.prompt(
            'Nom de la section Client First\n(ex : hero, features, pricing)',
            'hero'
          );
          if (!input?.trim()) return;
          const slug = input.trim().toLowerCase().replace(/\s+/g, '-');
          ed.addComponents(buildClientFirstHTML(slug));
        },
      });
    };
  },
};

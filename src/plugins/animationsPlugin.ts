// Plugin Animations — Animate.css + AOS (Animate On Scroll)
//
// Responsabilités :
//  1. Ajouter des blocs prêts à l'emploi avec Animate.css pré-appliqué
//  2. Injecter des traits AOS (data-aos, data-aos-duration) sur tous les composants
//  3. Rafraîchir AOS dans le canvas à chaque modification
//
// Les CDN eux-mêmes sont déclarés dans options.canvas (pas ici).
// Ce fichier ne touche pas à la config de base — il reçoit editor et c'est tout.

// ─── Constantes ────────────────────────────────────────────────────────────────

const AOS_ANIMATIONS = [
  { id: '',            label: '— Aucune —'   },
  { id: 'fade-up',    label: 'Fade Up'       },
  { id: 'fade-down',  label: 'Fade Down'     },
  { id: 'fade-left',  label: 'Fade Left'     },
  { id: 'fade-right', label: 'Fade Right'    },
  { id: 'zoom-in',    label: 'Zoom In'       },
  { id: 'zoom-out',   label: 'Zoom Out'      },
  { id: 'flip-left',  label: 'Flip Left'     },
];

// Les deux traits AOS — définis une seule fois, réutilisés partout
const AOS_TRAITS = [
  {
    type: 'select',
    name: 'data-aos',
    label: 'Animation AOS',
    options: AOS_ANIMATIONS,
    // Quand la valeur change, GrapesJS met à jour l'attribut HTML automatiquement
  },
  {
    type: 'number',
    name: 'data-aos-duration',
    label: 'Durée AOS (ms)',
    placeholder: '800',
    min: 100,
    max: 3000,
  },
];

// ─── Blocs Animate.css ─────────────────────────────────────────────────────────
// Chaque bloc est une fonction pour garder les données isolées (pas de mutation)

function makeAnimateBlock(opts: {
  id: string;
  label: string;
  animateClass: string;
  tag: string;
  content: string;
  emoji: string;
}) {
  return {
    id: opts.id,
    label: opts.emoji + ' ' + opts.label,
    category: 'Animations',
    // Le media est l'aperçu dans le panneau Blocs
    media: `<div style="font-size:28px;text-align:center;padding:8px">${opts.emoji}</div>`,
    content: `<${opts.tag}
  class="animate__animated ${opts.animateClass}"
  style="display:inline-block"
>${opts.content}</${opts.tag}>`,
    attributes: { title: opts.label },
  };
}

const ANIMATE_BLOCKS = [
  makeAnimateBlock({
    id: 'anim-fade-in-box',
    label: 'Fade In Box',
    animateClass: 'animate__fadeIn',
    tag: 'div',
    content: 'Fade In',
    emoji: '✨',
  }),
  makeAnimateBlock({
    id: 'anim-bounce-btn',
    label: 'Bounce Button',
    animateClass: 'animate__bounce',
    tag: 'button',
    content: 'Bounce !',
    emoji: '🏀',
  }),
  makeAnimateBlock({
    id: 'anim-slide-in-left',
    label: 'Slide In Left',
    animateClass: 'animate__slideInLeft',
    tag: 'div',
    content: 'Slide In Left',
    emoji: '⬅️',
  }),
  makeAnimateBlock({
    id: 'anim-zoom-in-card',
    label: 'Zoom In Card',
    animateClass: 'animate__zoomIn',
    tag: 'div',
    content: 'Zoom In',
    emoji: '🔍',
  }),
  makeAnimateBlock({
    id: 'anim-flash-text',
    label: 'Flash Text',
    animateClass: 'animate__flash',
    tag: 'p',
    content: 'Flash !',
    emoji: '⚡',
  }),
];

// ─── Logique AOS ───────────────────────────────────────────────────────────────

// Ajoute les traits AOS sur un composant si ce n'est pas déjà fait.
// On vérifie d'abord pour éviter les doublons en cas d'appel multiple.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addAosTraitsTo(component: any) {
  if (component.getTrait('data-aos')) return; // déjà présent → on skip
  component.addTrait(AOS_TRAITS);
}

// Rafraîchit AOS dans le canvas iframe après chaque modification.
// Nécessaire car AOS s'initialise une seule fois au chargement.
// Sans refresh, les nouveaux éléments ajoutés ne seront pas animés.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function refreshAOS(editor: any) {
  try {
    // editor.Canvas.getWindow() = la fenêtre de l'iframe canvas de GrapesJS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvasWin = editor.Canvas.getWindow() as any;
    if (canvasWin?.AOS) {
      canvasWin.AOS.init({
        once: false,   // rejoue l'animation à chaque scroll (pratique pour l'édition)
        duration: 800,
      });
    }
  } catch {
    // Silencieux : le canvas n'est pas forcément prêt au moment de l'appel
  }
}

// ─── Export du plugin ──────────────────────────────────────────────────────────

export const animationsPlugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(_options: Record<string, unknown> = {}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function animationsPluginFn(editor: any) {

      // 1. Enregistrer les blocs Animate.css dans le BlockManager
      ANIMATE_BLOCKS.forEach((block) => editor.BlockManager.add(block.id, block));

      // 2. Ajouter les traits AOS sur tous les composants existants au chargement
      editor.on('load', () => {
        // Parcourt récursivement tous les composants déjà présents sur le canvas
        editor.DomComponents.getWrapper().onAll(addAosTraitsTo);
        // Initialise AOS dans le canvas
        refreshAOS(editor);
      });

      // 3. Ajouter les traits AOS sur chaque nouveau composant ajouté
      // Cela couvre les blocs drag&drop ET le plugin clientFirst
      editor.on('component:add', addAosTraitsTo);

      // 4. Rafraîchir AOS quand le canvas change (ajout, modification, suppression)
      editor.on('component:update', () => refreshAOS(editor));
      editor.on('component:remove', () => refreshAOS(editor));
    };
  },
};

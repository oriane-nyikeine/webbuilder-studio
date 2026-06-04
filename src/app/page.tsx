'use client';

// 'use client' est requis ici pour deux raisons :
// 1. next/dynamic avec ssr:false ne peut être déclaré que dans un Client Component
//    (le boundary "client" doit englober l'import dynamique)
// 2. GrapesJS est une bibliothèque purement navigateur → jamais côté serveur
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';

// ssr: false = GrapesJS ne sera jamais exécuté côté serveur.
// Next.js injecte LoadingScreen côté serveur, puis remplace par l'éditeur réel
// une fois le bundle JavaScript chargé dans le navigateur.
const StudioEditorWrapper = dynamic(
  () => import('@/components/StudioEditorWrapper'),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

export default function Home() {
  return <StudioEditorWrapper />;
}

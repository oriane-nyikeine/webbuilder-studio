'use client';

// Composant de chargement séparé : marqué 'use client' pour pouvoir
// injecter un <style> avec l'animation CSS directement dans le DOM
export default function LoadingScreen() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 10, 20, 1)',
        color: 'rgba(200, 200, 255, 1)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '1rem',
        gap: '12px',
      }}
    >
      <style>{`
        @keyframes studio-spin {
          to { transform: rotate(360deg); }
        }
        .studio-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 0, 100, 0.3);
          border-top-color: rgba(255, 0, 100, 1);
          border-radius: 50%;
          animation: studio-spin 0.8s linear infinite;
        }
      `}</style>
      <span className="studio-spinner" />
      Chargement de l&apos;éditeur…
    </div>
  );
}

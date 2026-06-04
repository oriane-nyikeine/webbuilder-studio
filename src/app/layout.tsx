import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebBuilder Studio",
  description: "Éditeur web visuel propulsé par GrapesJS Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // overflow-hidden évite les scrollbars parasites autour de l'éditeur plein écran
    <html lang="fr" className="h-full overflow-hidden">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}

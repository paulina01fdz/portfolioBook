import type { Metadata } from "next";
// Fuentes autoalojadas: evita que el build/dev dependa de fonts.googleapis.com.
import "@fontsource-variable/outfit";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/caveat";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/playfair-display";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paulina Fernández Hernández · Portfolio 2026",
  description:
    "Portafolio digital interactivo Paulina Fernández Hernández, Software Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

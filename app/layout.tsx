import type { Metadata } from "next";
import {
  Caveat,
  Montserrat,
  Outfit,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-thanks",
  display: "swap",
});

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
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${caveat.variable} ${montserrat.variable} ${playfair.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

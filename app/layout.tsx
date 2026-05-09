import type { Metadata } from "next";
import { Inter, Space_Mono, Comic_Neue } from "next/font/google";
import "./globals.css";
import DynamicThemeWrapper, { VisualTheme } from "@/components/layout/DynamicThemeWrapper";
import TopNav from "@/components/layout/TopNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  variable: "--font-comic-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LevelUp AI | Generative UI Learning Adventure",
  description: "An AI-powered RPG-style educational platform where your learning path is dynamically generated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // En el futuro este valor vendrá de estado o de la base de datos
  const currentTheme: VisualTheme = "cyber-hacker";

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceMono.variable} ${comicNeue.variable} antialiased`}>
        <DynamicThemeWrapper visualTheme={currentTheme}>
          <TopNav visualTheme={currentTheme} />
          <main className="p-8 pt-12 md:pt-16">
            {children}
          </main>
        </DynamicThemeWrapper>
      </body>
    </html>
  );
}

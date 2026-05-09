import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
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
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-black text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

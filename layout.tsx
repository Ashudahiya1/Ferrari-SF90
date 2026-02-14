import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ferrari SF90 XX Stradale | The First Road-Legal XX Hypercar",
  description:
    "Experience the Ferrari SF90 XX Stradale — 1,030 PS of hybrid fury, radical aerodynamics, and the first fixed rear wing since the F50. The ultimate expression of Ferrari's XX Programme for the road.",
  keywords: [
    "Ferrari",
    "SF90 XX",
    "Stradale",
    "hypercar",
    "hybrid",
    "V8",
    "luxury",
  ],
  openGraph: {
    title: "Ferrari SF90 XX Stradale",
    description: "The first road-legal XX hypercar. 1,030 PS. Born on track.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

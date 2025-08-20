import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
})

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white`}>
        {children}
      </body>
    </html>
  );
}

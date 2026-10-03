import type { Metadata } from "next";
import { Montserrat, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Andima MID",
  description: "Aplikasi Andima MID",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body className={`${syne.variable} ${montserrat.variable}`}>{children}</body>
    </html>
  );
}

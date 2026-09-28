import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { isLocale, locales, translate, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";

const geist = localFont({ src: "../../assets/fonts/Geist.ttf", variable: "--font-sans", weight: "100 900", display: "swap" });
const geistMono = localFont({ src: "../../assets/fonts/GeistMono.ttf", variable: "--font-mono", weight: "100 900", display: "swap" });

export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "ru");
}
export const viewport: Viewport = {
  width: "device-width", initialScale: 1, colorScheme: "light dark",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f7f8" }, { media: "(prefers-color-scheme: dark)", color: "#0d1116" }],
};
export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("min-h-dvh bg-background font-sans text-foreground antialiased", geist.variable, geistMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a className="skip-link" href="#main-content">{translate(locale, "Перейти к содержимому", "Skip to content")}</a>
          <Navbar locale={locale} />
          <div className="site-canvas">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

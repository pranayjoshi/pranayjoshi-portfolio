import type React from "react"
import type { Metadata, Viewport } from "next"
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-hanken" })
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono" })

const description = "Physical AI, AI safety, BCI and backend. I build the software behind machines that sense and move, and the checks that keep them safe."

export const metadata: Metadata = {
  metadataBase: new URL("https://pranayjoshi-portfolio.vercel.app"),
  title: "Pranay Joshi",
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Pranay Joshi", description, type: "website", images: ["/projects/armed.jpg"] },
  twitter: { card: "summary_large_image", creator: "@pranayjoshi_4", title: "Pranay Joshi", description, images: ["/projects/armed.jpg"] },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
    { media: "(prefers-color-scheme: light)", color: "#ebe9e4" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="pj-theme" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

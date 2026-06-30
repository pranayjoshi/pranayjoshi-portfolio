import type React from "react"
import type { Metadata } from "next"
import { Hanken_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken-grotesk" })

export const metadata: Metadata = {
  title: "Pranay Joshi",
  description: "Portfolio of Pranay Joshi - Full Stack & Backend Engineer",
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${hankenGrotesk.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

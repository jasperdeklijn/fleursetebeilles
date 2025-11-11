import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fleurs et Abeilles",
  description:
    "Experience comfort and luxury in our beautiful bed and breakfast. Available in English, Dutch, and French.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Toaster />
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

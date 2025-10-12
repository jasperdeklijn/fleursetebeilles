"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText: string
}

export function HeroSection({ title, subtitle, ctaText }: HeroSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight

      // Progress only within the first viewport height
      const progress = Math.min(scrollY / heroHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    // This section takes 200% height so you can scroll through it
    <section className="relative h-[130vh] mb-[-10vh]">
      {/* Sticky hero wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated background */}
        <div
          className="absolute inset-0 z-0 will-change-transform transition-transform duration-75"
          style={{
            transform: `translateY(${scrollProgress * -30}vh) scale(${1 + scrollProgress * 0.2})`,
            opacity: `${1 - scrollProgress * 1.2}`,
          }}
        >
          <Image
            src="/IMG_20250520_145641.jpg"
            alt="Natuurlijke omgeving"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Foreground content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
          style={{
            transform: `translateY(${scrollProgress * -20}vh)`,
            opacity: `${1 - scrollProgress * 1.2}`,
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{subtitle}</p>
          <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface AboutSectionProps {
  title: string
  description: string
}

const images = [
  { src: "/about1.jpg", caption: "Our cozy rooms" },
  { src: "/about2.jpg", caption: "Relaxing nature" },
  { src: "/about3.jpg", caption: "Local experiences" },
  { src: "/about4.jpeg", caption: "Delicious meals" },
  { src: "/about5.jpg", caption: "Peaceful mornings" },
]

export function AboutSection({ title, description }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Scroll-based activation (for mobile)
  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      if (!containerRef.current) return
      const items = containerRef.current.querySelectorAll(".about-image-item")

      let closestIndex = 0
      let closestDistance = Infinity
      const triggerPoint = window.innerHeight * 0.35 // ~top 1/3 of screen

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        const distance = Math.abs(rect.top - triggerPoint)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // trigger once on load
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  const toggle = (index: number) => {
    if (!isMobile) {
      setActiveIndex(activeIndex === index ? null : index)
    }
  }

  return (
    <section className="relative px-4 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-24">
        {/* LEFT: Text */}
        <div className="space-y-6 text-center md:text-left sticky top-24 self-start">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* RIGHT: Image carousel */}
        <div ref={containerRef} className="flex flex-col space-y-4 sticky top-24">
          {images.map((image, index) => {
            const isActive = activeIndex === index
            return (
              <motion.div
                key={index}
                layout
                onClick={() => toggle(index)}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                className={`about-image-item relative overflow-hidden rounded-2xl shadow-xl cursor-pointer ${
                  isActive ? "h-[400px]" : "h-[120px]"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      isActive ? "brightness-100 scale-105" : "brightness-50"
                    }`}
                    priority={index === 0}
                  />
                </div>

                {/* Caption */}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-lg md:text-xl font-medium mb-4 text-center px-4"
                  >
                    {image.caption}
                  </motion.p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
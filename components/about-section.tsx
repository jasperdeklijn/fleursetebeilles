"use client"

import { useState } from "react"
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
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="relative py-24 px-4 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT: Text */}
        <div className="space-y-6 text-center md:text-left sticky top-24 self-start">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>

          <div className="space-y-4 text-muted-foreground">
            <p>
              We offer a peaceful retreat surrounded by nature — ideal for relaxation,
              adventure, or quiet reflection. Every room is designed to make you feel at home.
            </p>
            <p>
              Our team ensures that each guest has a memorable stay, whether you’re
              here for a weekend escape or a longer visit.
            </p>
          </div>
        </div>

        {/* RIGHT: Vertical Accordion */}
        <div className="flex flex-col space-y-4">
          {images.map((image, index) => {
            const isActive = activeIndex === index
            return (
              <motion.div
                key={index}
                layout
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                className={`relative overflow-hidden rounded-2xl shadow-xl cursor-pointer ${
                  isActive ? "h-[400px]" : "h-[120px]"
                }`}
                onClick={() => toggle(index)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className={`object-cover transition-all duration-500 ${
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

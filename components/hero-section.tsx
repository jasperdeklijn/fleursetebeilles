import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText: string
  propertyImages: string[]
}

export function HeroSection({ title, subtitle, ctaText, propertyImages }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={propertyImages[0] || "/placeholder.svg?height=800&width=1200&query=beautiful bnb exterior"}
          alt="BnB Property"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 text-pretty opacity-90">{subtitle}</p>
        <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
          {ctaText}
        </Button>
      </div>

      {/* Floating Cards */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex gap-4">
        {propertyImages.slice(1, 4).map((image, index) => (
          <Card key={index} className="overflow-hidden w-24 h-24 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Property view ${index + 2}`}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </Card>
        ))}
      </div>
    </section>
  )
}

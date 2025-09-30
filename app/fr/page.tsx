import { getContent, getPropertyInfo } from "@/lib/content"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { AmenitiesSection } from "@/components/amenities-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function FrenchPage() {
  const content = await getContent("fr")
  const property = await getPropertyInfo()

  if (!property) {
    return <div>Property information not found</div>
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">{property.name}</div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection
          title={content.hero_title || "Bienvenue dans Notre Magnifique BnB"}
          subtitle={content.hero_subtitle || "Découvrez le confort et le luxe"}
          ctaText={content.hero_cta || "Réservez Votre Séjour"}
          propertyImages={property.images}
        />

        <AboutSection
          title={content.about_title || "À Propos de Notre Propriété"}
          description={content.about_description || "Notre charmant bed and breakfast..."}
          property={property}
        />

        <AmenitiesSection
          title={content.amenities_title || "Équipements & Caractéristiques"}
          amenities={property.amenities}
        />

        <PricingSection
          title={content.pricing_title || "Tarifs & Disponibilité"}
          description={content.pricing_description || "Tarifs compétitifs avec une valeur exceptionnelle"}
          property={property}
        />

        <ContactSection
          title={content.contact_title || "Contactez-Nous"}
          description={content.contact_description || "Prêt à réserver votre séjour?"}
        />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>{content.footer_text || "© 2025 Magnifique BnB. Tous droits réservés."}</p>
        </div>
      </footer>
    </div>
  )
}

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

export default async function DutchPage() {
  const content = await getContent("nl")
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
          title={content.hero_title || "Welkom bij Onze Prachtige BnB"}
          subtitle={content.hero_subtitle || "Ervaar comfort en luxe"}
          ctaText={content.hero_cta || "Boek Uw Verblijf"}
          propertyImages={property.images}
        />

        <AboutSection
          title={content.about_title || "Over Ons Pand"}
          description={content.about_description || "Onze charmante bed and breakfast..."}
          property={property}
        />

        <AmenitiesSection
          title={content.amenities_title || "Voorzieningen & Faciliteiten"}
          amenities={property.amenities}
        />

        <PricingSection
          title={content.pricing_title || "Prijzen & Beschikbaarheid"}
          description={content.pricing_description || "Concurrerende tarieven met uitzonderlijke waarde"}
          property={property}
        />

        <ContactSection
          title={content.contact_title || "Neem Contact Op"}
          description={content.contact_description || "Klaar om uw verblijf te boeken?"}
        />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>{content.footer_text || "© 2025 Prachtige BnB. Alle rechten voorbehouden."}</p>
        </div>
      </footer>
    </div>
  )
}

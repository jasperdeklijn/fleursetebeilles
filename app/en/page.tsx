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

export default async function EnglishPage() {
  const content = await getContent("en")
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
          title={content.hero_title || "Welcome to Our Beautiful BnB"}
          subtitle={content.hero_subtitle || "Experience comfort and luxury"}
          ctaText={content.hero_cta || "Book Your Stay"}
          propertyImages={property.images}
        />

        <AboutSection
          title={content.about_title || "About Our Property"}
          description={content.about_description || "Our charming bed and breakfast..."}
          property={property}
        />

        <AmenitiesSection
          title={content.amenities_title || "Amenities & Features"}
          amenities={property.amenities}
        />

        <PricingSection
          title={content.pricing_title || "Pricing & Availability"}
          description={content.pricing_description || "Competitive rates with exceptional value"}
          property={property}
        />

        <ContactSection
          title={content.contact_title || "Get In Touch"}
          description={content.contact_description || "Ready to book your stay?"}
        />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>{content.footer_text || "© 2025 Beautiful BnB. All rights reserved."}</p>
        </div>
      </footer>
    </div>
  )
}

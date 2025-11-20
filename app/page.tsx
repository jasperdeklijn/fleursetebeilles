import { getContent } from "@/lib/services/contentService"
import { getAllRooms } from "@/lib/services/roomService"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { RoomsSection } from "@/components/rooms-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import ClientNav from "@/components/client-nav"

export const dynamic = 'force-dynamic'

type Lang = "en" | "fr" | "nl"


// Default fallback texts for each language
const fallbackTexts: Record<Lang, {
  hero_title: string
  hero_subtitle: string
  hero_cta: string
  about_title: string
  about_description: string
  amenities_title: string
  pricing_title: string
  pricing_description: string
  contact_title: string
  contact_description: string
  footer_text: string
}> = {
  en: {
    hero_title: "Welcome to Our Beautiful BnB",
    hero_subtitle: "Experience comfort and luxury",
    hero_cta: "Book Your Stay",
    about_title: "About Our Property",
    about_description: "Our charming bed and breakfast...",
    amenities_title: "Amenities & Features",
    pricing_title: "Pricing & Availability",
    pricing_description: "Competitive rates with exceptional value",
    contact_title: "Get In Touch",
    contact_description: "Ready to book your stay?",
    footer_text: "© 2025 Beautiful BnB. All rights reserved.",
  },
  fr: {
    hero_title: "Bienvenue dans Notre Magnifique BnB",
    hero_subtitle: "Découvrez le confort et le luxe",
    hero_cta: "Réservez Votre Séjour",
    about_title: "À Propos de Notre Propriété",
    about_description: "Notre charmant bed and breakfast...",
    amenities_title: "Équipements & Caractéristiques",
    pricing_title: "Tarifs & Disponibilité",
    pricing_description: "Tarifs compétitifs avec une valeur exceptionnelle",
    contact_title: "Contactez-Nous",
    contact_description: "Prêt à réserver votre séjour?",
    footer_text: "© 2025 Magnifique BnB. Tous droits réservés.",
  },
  nl: {
  // Get language from query param, default to 'en'
    hero_title: "Welkom bij Onze Prachtige BnB",
    hero_subtitle: "Ervaar comfort en luxe",
    hero_cta: "Boek Uw Verblijf",
    about_title: "Over Ons Pand",
    about_description: "Onze charmante bed and breakfast...",
    amenities_title: "Voorzieningen & Faciliteiten",
    pricing_title: "Prijzen & Beschikbaarheid",
    pricing_description: "Concurrerende tarieven met uitzonderlijke waarde",
    contact_title: "Neem Contact Op",
    contact_description: "Klaar om uw verblijf te boeken?",
    footer_text: "© 2025 Prachtige BnB. Alle rechten voorbehouden.",
  },
}

export default async function HomePage({ searchParams }: { searchParams?: { lang?: string } }) {
  const langParam = searchParams?.lang
  const lang: Lang = (langParam === "en" || langParam === "fr" || langParam === "nl") ? langParam : "nl"

  const content = await getContent(lang)
  const room = await getAllRooms()
  const fallback = fallbackTexts[lang] || fallbackTexts.en

  if (!room) {
    return <div>Property information not found</div>
  }

  return (
    <div className="min-h-screen">
      {/* Header (client-side nav + smooth scrolling) */}
      <ClientNav lang={lang} />

      <main>
        <section id="hero">
          <HeroSection
            title={content.hero_title || fallback.hero_title}
            subtitle={content.hero_subtitle || fallback.hero_subtitle}
            ctaText={content.hero_cta || fallback.hero_cta}
          />
        </section>

        <section id="about">
          <AboutSection
            title={content.about_title || fallback.about_title}
            description={content.about_description || fallback.about_description}
          />
        </section>

        <section id="rooms"> 
          <RoomsSection rooms={room} lang={lang} />
        </section>

        <section id="contact">
          <ContactSection
            title={content.contact_title || fallback.contact_title}
            description={content.contact_description || fallback.contact_description}
            lang={lang}
          />
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>{content.footer_text || fallback.footer_text}</p>
        </div>
      </footer>
    </div>
  )
}

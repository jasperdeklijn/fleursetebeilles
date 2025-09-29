import { createClient } from "@/lib/supabase/server"

export interface ContentSection {
  id: string
  section_key: string
  section_name: string
  content_type: string
}

export interface ContentTranslation {
  id: string
  section_id: string
  language_code: string
  content: string
}

export interface PropertyInfo {
  id: string
  name: string
  description: string
  address: string
  max_guests: number
  bedrooms: number
  bathrooms: number
  price_per_night: number
  currency: string
  amenities: string[]
  images: string[]
}

const fallbackContent = {
  en: {
    hero_title: "Welcome to Our Beautiful BnB",
    hero_subtitle: "Experience comfort and luxury in the heart of the city",
    hero_cta: "Book Your Stay",
    about_title: "About Our Property",
    about_description:
      "Our charming bed and breakfast offers a perfect blend of modern comfort and traditional hospitality. Located in a peaceful neighborhood, we provide an ideal retreat for travelers seeking authentic experiences.",
    amenities_title: "Amenities & Features",
    pricing_title: "Pricing & Availability",
    pricing_description: "Competitive rates with exceptional value",
    contact_title: "Get In Touch",
    contact_description: "Ready to book your stay? Contact us for availability and special offers.",
    footer_text: "© 2025 Beautiful BnB. All rights reserved.",
  },
  nl: {
    hero_title: "Welkom bij Onze Prachtige BnB",
    hero_subtitle: "Ervaar comfort en luxe in het hart van de stad",
    hero_cta: "Boek Uw Verblijf",
    about_title: "Over Ons Pand",
    about_description:
      "Onze charmante bed and breakfast biedt een perfecte mix van modern comfort en traditionele gastvrijheid. Gelegen in een rustige buurt, bieden wij een ideaal toevluchtsoord voor reizigers die op zoek zijn naar authentieke ervaringen.",
    amenities_title: "Voorzieningen & Faciliteiten",
    pricing_title: "Prijzen & Beschikbaarheid",
    pricing_description: "Concurrerende tarieven met uitzonderlijke waarde",
    contact_title: "Neem Contact Op",
    contact_description:
      "Klaar om uw verblijf te boeken? Neem contact met ons op voor beschikbaarheid en speciale aanbiedingen.",
    footer_text: "© 2025 Prachtige BnB. Alle rechten voorbehouden.",
  },
  fr: {
    hero_title: "Bienvenue dans Notre Magnifique BnB",
    hero_subtitle: "Découvrez le confort et le luxe au cœur de la ville",
    hero_cta: "Réservez Votre Séjour",
    about_title: "À Propos de Notre Propriété",
    about_description:
      "Notre charmant bed and breakfast offre un mélange parfait de confort moderne et d'hospitalité traditionnelle. Situé dans un quartier paisible, nous offrons une retraite idéale pour les voyageurs en quête d'expériences authentiques.",
    amenities_title: "Équipements & Caractéristiques",
    pricing_title: "Tarifs & Disponibilité",
    pricing_description: "Tarifs compétitifs avec une valeur exceptionnelle",
    contact_title: "Contactez-Nous",
    contact_description: "Prêt à réserver votre séjour ? Contactez-nous pour la disponibilité et les offres spéciales.",
    footer_text: "© 2025 Magnifique BnB. Tous droits réservés.",
  },
}

const fallbackPropertyInfo: PropertyInfo = {
  id: "fallback",
  name: "Beautiful City BnB",
  description: "A charming bed and breakfast in the heart of the city",
  address: "123 Main Street, City Center",
  max_guests: 4,
  bedrooms: 2,
  bathrooms: 2,
  price_per_night: 89.0,
  currency: "EUR",
  amenities: [
    "Free WiFi",
    "Breakfast Included",
    "Air Conditioning",
    "Private Bathroom",
    "City View",
    "Non-Smoking",
    "Parking Available",
  ],
  images: ["/modern-bnb-bedroom.jpg", "/cozy-bnb-living-room.jpg", "/bnb-breakfast-area.jpg", "/bnb-exterior-view.jpg"],
}

export async function getContent(language = "en") {
  try {
    const supabase = await createClient()

    const { data: translations, error } = await supabase
      .from("content_translations")
      .select(`
        content,
        content_sections!inner(section_key)
      `)
      .eq("language_code", language)

    if (error) {
      console.error("Error fetching content:", error.message)
      return fallbackContent[language as keyof typeof fallbackContent] || fallbackContent.en
    }

    // Transform into a key-value object for easy access
    const contentMap: Record<string, string> = {}
    translations?.forEach((translation: any) => {
      contentMap[translation.content_sections.section_key] = translation.content
    })

    return contentMap
  } catch (error) {
    console.error("Error in getContent:", error)
    return fallbackContent[language as keyof typeof fallbackContent] || fallbackContent.en
  }
}

export async function getPropertyInfo() {
  try {
    const supabase = await createClient()

    const { data: property, error } = await supabase.from("property_info").select("*").maybeSingle()

    if (error) {
      console.error("Error fetching property info:", error.message)
      return fallbackPropertyInfo
    }

    // Return the property or fallback
    return (property as PropertyInfo) || fallbackPropertyInfo
  } catch (error) {
    console.error("Error in getPropertyInfo:", error)
    return fallbackPropertyInfo
  }
}

import { Room } from "@/lib/types/room"

export const fallbackContent = {
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
}

export const fallbackRoom: Room = {
  id: "fallback",
  name: "Beautiful City BnB",
  description: "A charming bed and breakfast in the heart of the city",
  max_guests: 4,
  price_per_night: 89.0,
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
  bed_type: "Queen",
  size_sqm: 20,
  is_available: true,
  sort_order: 0
}

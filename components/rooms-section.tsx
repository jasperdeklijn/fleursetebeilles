"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BedDouble, Users, Ruler, Check } from "lucide-react"

import type { Room } from "@/lib/types/room"

interface RoomsSectionProps {
  rooms: Room[]
  lang: "nl" | "en" | "fr"
}

const translations = {
  nl: {
    title: "Onze Kamers",
    bookNow: "Boek Nu",
    guests: "gasten",
    size: "m²",
    amenities: "Voorzieningen",
    perNight: "per nacht",
    notAvailable: "Niet beschikbaar",
  },
  en: {
    title: "Our Rooms",
    bookNow: "Book Now",
    guests: "guests",
    size: "m²",
    amenities: "Amenities",
    perNight: "per night",
    notAvailable: "Not available",
  },
  fr: {
    title: "Nos Chambres",
    bookNow: "Réserver",
    guests: "personnes",
    size: "m²",
    amenities: "Équipements",
    perNight: "par nuit",
    notAvailable: "Non disponible",
  },
}

export function RoomsSection({ rooms, lang }: RoomsSectionProps) {
  const t = translations[lang]

  return (
    <section id="rooms" className="relative py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h2>
        <p className="text-muted-foreground text-lg">
          {lang === "nl"
            ? "Ontdek onze zorgvuldig ingerichte kamers, elk ontworpen voor comfort en ontspanning."
            : lang === "en"
            ? "Discover our carefully designed rooms, each made for comfort and relaxation."
            : "Découvrez nos chambres soigneusement décorées, conçues pour votre confort et détente."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
        {rooms
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden rounded-3xl shadow-lg group bg-background">
                {/* Image Carousel */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={room.images?.[0] || "/placeholder.jpg"}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {!room.is_available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                      {t.notAvailable}
                    </div>
                  )}
                </div>

                <CardContent className="p-6 text-left">
                  <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{room.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{room.max_guests} {t.guests}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-primary" />
                      <span>{room.bed_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-primary" />
                      <span>{room.size_sqm} {t.size}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-1">{t.amenities}:</p>
                      <ul className="flex flex-wrap gap-2">
                        {room.amenities.slice(0, 5).map((a, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs"
                          >
                            <Check className="w-3 h-3" /> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-lg font-bold text-primary">
                      €{room.price_per_night} <span className="text-sm font-normal text-muted-foreground">{t.perNight}</span>
                    </span>
                    {room.is_available && (
                      <Button size="sm" className="rounded-full">
                        {t.bookNow}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </section>
  )
}
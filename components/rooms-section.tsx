"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { BedDouble, Users, Ruler, Check, ChevronLeft, ChevronRight, X } from "lucide-react"
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
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextImage = () => {
    if (!selectedRoom) return
    setActiveImageIndex((prev) => (prev + 1) % selectedRoom.images.length)
  }

  const prevImage = () => {
    if (!selectedRoom) return
    setActiveImageIndex(
      (prev) => (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length
    )
  }

  return (
    <section id="rooms" className="relative py-20 bg-muted/30 overflow-hidden">
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

      {/* Horizontal Scroll Carousel */}
      <div className="relative">
        {/* Always-visible navigation arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 shadow-md z-10"
          onClick={() => {
            const container = document.getElementById("rooms-scroll")
            if (container) container.scrollBy({ left: -350, behavior: "smooth" })
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 shadow-md z-10"
          onClick={() => {
            const container = document.getElementById("rooms-scroll")
            if (container) container.scrollBy({ left: 350, behavior: "smooth" })
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          id="rooms-scroll"
          className="flex overflow-x-auto snap-x snap-mandatory space-x-6 px-6 scrollbar-hide scroll-smooth"
        >
          {rooms
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="snap-center min-w-[320px] md:min-w-[420px] flex-shrink-0"
              >
                <Card className="overflow-hidden rounded-3xl shadow-lg group bg-background">
                  {/* Room Image */}
                  <div
                    className="relative h-64 w-full overflow-hidden cursor-pointer"
                    onClick={() => {
                      setSelectedRoom(room)
                      setActiveImageIndex(0)
                    }}
                  >
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
                        <span>
                          {room.max_guests} {t.guests}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-primary" />
                        <span>{room.bed_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-primary" />
                        <span>
                          {room.size_sqm} {t.size}
                        </span>
                      </div>
                    </div>

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

                    <div className="flex items-center justify-between mt-6">
                      <span className="text-lg font-bold text-primary">
                        €{room.price_per_night}{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          {t.perNight}
                        </span>
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
      </div>

      {/* Popup Modal / Drawer */}
      {selectedRoom && !isMobile && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedRoom(null)
          }}
        >
          <div className="relative w-full max-w-3xl bg-background rounded-2xl overflow-hidden shadow-xl">
            <button
              className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              onClick={() => setSelectedRoom(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Carousel */}
            <div className="relative w-full h-[400px]">
              <Image
                src={selectedRoom.images[activeImageIndex] || "/placeholder.jpg"}
                alt={selectedRoom.name}
                fill
                className="object-cover rounded-2xl"
              />
              {selectedRoom.images.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{selectedRoom.name}</h3>
              <p className="text-muted-foreground mt-2">{selectedRoom.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {selectedRoom && isMobile && (
        <Drawer open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
          <DrawerContent className="max-h-[85vh] overflow-hidden">
            <DrawerHeader className="flex justify-between items-center px-4">
              <DrawerTitle>{selectedRoom.name}</DrawerTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedRoom(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerHeader>

            <div className="relative w-full h-[300px]">
              <Image
                src={selectedRoom.images[activeImageIndex] || "/placeholder.jpg"}
                alt={selectedRoom.name}
                fill
                className="object-cover"
              />
              {selectedRoom.images.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="p-4 text-center">
              <p className="text-muted-foreground">{selectedRoom.description}</p>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </section>
  )
}

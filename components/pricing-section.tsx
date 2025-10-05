"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Euro, Calendar, Users } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Room } from "@/lib/types/room"

interface PricingSectionProps {
  title: string
  description: string
  rooms: Room[]
}

export function PricingSection({ title, description, rooms }: PricingSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{title}</h2>
          <p className="text-lg text-muted-foreground text-pretty">{description}</p>
        </div>

        <Carousel className="max-w-3xl mx-auto">
          <CarouselContent>
            {rooms.map((room) => (
              <CarouselItem key={room.id} className="p-4">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{room.name}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
                      <Euro className="h-8 w-8" />
                      {room.price_per_night}
                      <span className="text-lg text-muted-foreground font-normal">/ nacht</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Max Gasten</span>
                      </div>
                      <Badge variant="secondary">{room.max_guests}</Badge>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Minimum Verblijf</span>
                      </div>
                      <Badge variant="secondary">2 nachten</Badge>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full" size="lg">
                        Beschikbaarheid Controleren
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      Prijzen kunnen variëren op basis van seizoen en beschikbaarheid
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

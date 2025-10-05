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
    <section className="py-12 sm:py-16 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground">{description}</p>
        </div>

        <Carousel
          className="max-w-full sm:max-w-3xl mx-auto"
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {rooms.map((room) => (
              <CarouselItem
                key={room.id}
                className="basis-full sm:basis-1/2 md:basis-1/3 pl-2 sm:pl-4"
              >
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl sm:text-2xl">{room.name}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-primary">
                      <Euro className="h-6 w-6 sm:h-8 sm:w-8" />
                      {room.price_per_night}
                      <span className="text-sm sm:text-lg text-muted-foreground font-normal">/ nacht</span>
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

                    <div className="pt-2 sm:pt-4">
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

          <CarouselPrevious className="left-2 sm:-left-10" />
          <CarouselNext className="right-2 sm:-right-10" />
        </Carousel>
      </div>
    </section>
  )
}

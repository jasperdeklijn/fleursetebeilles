import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Coffee, Snowflake, Bath, Eye, Ban, Car, Star, Shield, Utensils } from "lucide-react"

interface AmenitiesSectionProps {
  title: string
  amenities: string[]
}

const amenityIcons: Record<string, any> = {
  "Gratis WiFi": Wifi,
  "Free WiFi": Wifi,
  "Ontbijt Inbegrepen": Coffee,
  "Breakfast Included": Coffee,
  Airconditioning: Snowflake,
  "Air Conditioning": Snowflake,
  "Privé Badkamer": Bath,
  "Private Bathroom": Bath,
  "Uitzicht op de Stad": Eye,
  "City View": Eye,
  "Niet Roken": Ban,
  "Non-Smoking": Ban,
  "Parkeren Beschikbaar": Car,
  "Parking Available": Car,
  "Premium Service": Star,
  Veilig: Shield,
  Secure: Shield,
  "Toegang tot Keuken": Utensils,
  "Kitchen Access": Utensils,
}

export function AmenitiesSection({ title, amenities }: AmenitiesSectionProps) {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((amenity, index) => {
            const IconComponent = amenityIcons[amenity] || Star
            return (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <IconComponent className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="text-sm font-medium">{amenity}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

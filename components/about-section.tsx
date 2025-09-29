import { Card } from "@/components/ui/card"
import { MapPin, Users, Bed, Bath } from "lucide-react"
import Image from "next/image"
import type { PropertyInfo } from "@/lib/content"

interface AboutSectionProps {
  title: string
  description: string
  property: PropertyInfo
}

export function AboutSection({ title, description, property }: AboutSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(0, 4).map((image, index) => (
              <Card key={index} className="overflow-hidden aspect-square">
                <Image
                  src={
                    image ||
                    `/placeholder.svg?height=300&width=300&query=dutch nature interior cozy green plants natural light room ${index + 1}`
                  }
                  alt={`Interieur ${index + 1}`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </Card>
            ))}
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">{property.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{property.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{property.max_guests}</div>
                <div className="text-sm text-muted-foreground">Gasten</div>
              </Card>
              <Card className="p-4 text-center">
                <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{property.bedrooms}</div>
                <div className="text-sm text-muted-foreground">Slaapkamers</div>
              </Card>
              <Card className="p-4 text-center">
                <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Badkamers</div>
              </Card>
            </div>

            <div>
              <p className="text-muted-foreground mb-4">{property.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

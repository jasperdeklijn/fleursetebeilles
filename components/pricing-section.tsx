import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Euro, Calendar, Users } from "lucide-react"
import type { PropertyInfo } from "@/lib/content"

interface PricingSectionProps {
  title: string
  description: string
  property: PropertyInfo
}

export function PricingSection({ title, description, property }: PricingSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{title}</h2>
          <p className="text-lg text-muted-foreground text-pretty">{description}</p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{property.name}</CardTitle>
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
              <Euro className="h-8 w-8" />
              {property.price_per_night}
              <span className="text-lg text-muted-foreground font-normal">/ nacht</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Max Gasten</span>
              </div>
              <Badge variant="secondary">{property.max_guests}</Badge>
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
      </div>
    </section>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"

interface ContactSectionProps {
  title: string
  description: string
}

export function ContactSection({ title, description }: ContactSectionProps) {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{title}</h2>
          <p className="text-lg text-muted-foreground text-pretty">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Stuur ons een bericht</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Voornaam</Label>
                  <Input id="firstName" placeholder="Jan" />
                </div>
                <div>
                  <Label htmlFor="lastName">Achternaam</Label>
                  <Input id="lastName" placeholder="de Vries" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="jan@voorbeeld.nl" />
              </div>
              <div>
                <Label htmlFor="dates">Gewenste Data</Label>
                <Input id="dates" placeholder="Inchecken tot Uitchecken" />
              </div>
              <div>
                <Label htmlFor="message">Bericht</Label>
                <Textarea id="message" placeholder="Vertel ons over uw verblijfvoorkeuren..." rows={4} />
              </div>
              <Button className="w-full">Bericht Versturen</Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">E-mail</h3>
                  <p className="text-muted-foreground">info@prachtigebnb.nl</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Telefoon</h3>
                  <p className="text-muted-foreground">+31 20 123 4567</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Adres</h3>
                  <p className="text-muted-foreground">
                    Hoofdstraat 123
                    <br />
                    Stadscentrum
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-semibold mb-2">Snelle Boeking</h3>
              <p className="text-sm opacity-90 mb-4">
                Voor directe boekingen, bel ons rechtstreeks of gebruik ons online boekingssysteem.
              </p>
              <Button variant="secondary" className="w-full">
                Nu Boeken
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

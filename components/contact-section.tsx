"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"
import { SiInstagram } from 'react-icons/si';
// Import server action from separate module
import { sendContact } from "@/actions/sendContact";

type Lang = "en" | "fr" | "nl"

interface ContactSectionProps {
  title: string
  description: string
  lang?: Lang
}

const labels: Record<Lang, {
  firstName: string
  lastName: string
  email: string
  dates: string
  message: string
  sendButton: string
  emailTitle: string
  phoneTitle: string
  addressTitle: string
  socialsTitle: string
  addressLine1: string
  addressLine2: string
  instagramHandle: string
}> = {
  en: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    dates: "Desired dates",
    message: "Message",
    sendButton: "Send Message",
    emailTitle: "Email",
    phoneTitle: "Phone",
    addressTitle: "Address",
    socialsTitle: "Socials",
    addressLine1: "Hoofdstraat 123",
    addressLine2: "City centre",
    instagramHandle: "@fleursetabeilles",
  },
  fr: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    dates: "Dates souhaitées",
    message: "Message",
    sendButton: "Envoyer le message",
    emailTitle: "E-mail",
    phoneTitle: "Téléphone",
    addressTitle: "Adresse",
    socialsTitle: "Réseaux",
    addressLine1: "Hoofdstraat 123",
    addressLine2: "Centre-ville",
    instagramHandle: "@fleursetabeilles",
  },
  nl: {
    firstName: "Voornaam",
    lastName: "Achternaam",
    email: "E-mail",
    dates: "Gewenste data",
    message: "Bericht",
    sendButton: "Bericht Versturen",
    emailTitle: "E-mail",
    phoneTitle: "Telefoon",
    addressTitle: "Adres",
    socialsTitle: "Socials",
    addressLine1: "Hoofdstraat 123",
    addressLine2: "Stadscentrum",
    instagramHandle: "@fleursetabeilles",
  },
}

export function ContactSection({ title, description, lang = "nl" }: ContactSectionProps) {
  const t = labels[lang] || labels.nl

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
              <CardTitle>{t.sendButton}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={sendContact}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t.firstName}</Label>
                    <Input id="firstName" name="firstName" placeholder={t.firstName === "Voornaam" ? "Jan" : "Jan"} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t.lastName}</Label>
                    <Input id="lastName" name="lastName" placeholder={t.lastName === "Achternaam" ? "de Vries" : "de Vries"} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input id="email" name="email" type="email" placeholder="jan@voorbeeld.nl" />
                </div>
                <div>
                  <Label htmlFor="dates">{t.dates}</Label>
                  <Input id="dates" name="dates" placeholder={t.dates} />
                </div>
                <div>
                  <Label htmlFor="message">{t.message}</Label>
                  <Textarea id="message" name="message" placeholder={t.message + "..."} rows={4} />
                </div>
                <Button type="submit" className="w-full">{t.sendButton}</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t.emailTitle}</h3>
                  <a href="mailto:info@fleursetabeilles.fr" className="text-muted-foreground">info@fleursetabeilles.fr</a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t.phoneTitle}</h3>
                  <a href="tel:+31201234567" className="text-muted-foreground">+31 20 123 4567</a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t.addressTitle}</h3>
                  <p className="text-muted-foreground">
                    {t.addressLine1}
                    <br />
                    {t.addressLine2}
                  </p>
                </div>
              </div>
            </Card>

             <Card className="p-6">
              <div className="flex items-center gap-4">
                <SiInstagram size={24}  className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t.socialsTitle}</h3>
                  <a
                    href="https://instagram.com/fleursetabeilles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center px-4 py-2 rounded-md bg-white text-primary text-sm font-medium shadow-sm hover:opacity-90"
                  >
                    {t.instagramHandle}
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

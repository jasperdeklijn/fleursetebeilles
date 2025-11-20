"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"
import { SiInstagram } from 'react-icons/si'

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
    addressLine1: "5 Place de l'eglise 79350",
    addressLine2: "Faye-l'Abbesse",
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
    addressLine1: "5 Place de l'eglise 79350",
    addressLine2: "Faye-l'Abbesse",
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
    addressLine1: "5 Place de l'eglise 79350",
    addressLine2: "Faye-l'Abbesse",
    instagramHandle: "@fleursetabeilles",
  },
}

export function ContactSection({ title, description, lang = "nl" }: ContactSectionProps) {
  const t = labels[lang] || labels.nl
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // toast state
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  function getSuccessMessage(lang: Lang) {
    switch (lang) {
      case "en":
        return "Message sent successfully!"
      case "fr":
        return "Message envoyé avec succès !"
      case "nl":
      default:
        return "Bericht succesvol verzonden!"
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement

    setLoading(true)
    setSuccess(false)
    setError(null)

    const formData = new FormData(form)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      dates: formData.get("dates"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/actions/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSuccess(true)
        form.reset() // safe: stored reference used
        // show toast
        setToastVisible(true)
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
        toastTimerRef.current = window.setTimeout(() => {
          setToastVisible(false)
          toastTimerRef.current = null
        }, 4000)
      } else {
        const result = await res.json().catch(() => ({}))
        setError(result.error || "Failed to send message.")
      }
    } catch (err: any) {
      setError(err.message || "Network error.")
    } finally {
      setLoading(false)
    }
  }

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
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t.firstName}</Label>
                    <Input id="firstName" name="firstName" placeholder={t.firstName === "Voornaam" ? "Jan" : "Jan"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t.lastName}</Label>
                    <Input id="lastName" name="lastName" placeholder={t.lastName === "Achternaam" ? "de Vries" : "de Vries"} />
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input id="email" name="email" type="email" placeholder="jan@voorbeeld.nl" />
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="dates">{t.dates}</Label>
                  <Input id="dates" name="dates" placeholder={t.dates} />
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="message">{t.message}</Label>
                  <Textarea id="message" name="message" placeholder={t.message + "..."} rows={4} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </span>
                  ) : t.sendButton}
                </Button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
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
                  <a href="tel:+31744540521" className="text-muted-foreground">+31 744540521</a>
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

      {/* toast top-right */}
      {toastVisible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-4 right-4 z-50 max-w-xs w-full"
        >
          <div className="bg-white border border-gray-200 shadow-md rounded-md p-3 flex items-start gap-3">
            <div className="text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{getSuccessMessage(lang)}</p>
            </div>
            <button
              onClick={() => setToastVisible(false)}
              aria-label="Dismiss"
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

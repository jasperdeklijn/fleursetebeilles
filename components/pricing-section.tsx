"use client"

import { Euro, Calendar, Users } from "lucide-react"
import { useState } from "react"

interface PricingSectionProps {
  title: string
  description: string
  lang: "nl" | "en" | "fr"
}

export function PricingSection({ title, description, lang }: PricingSectionProps) {
  type Extra = {
    id: string
    price: number
    name: { nl: string; en: string; fr: string }
    note?: { nl?: string; en?: string; fr?: string }
  }

  const extras: Extra[] = [
    {
      id: "breakfast",
      price: 10,
      name: { nl: "Ontbijt", en: "Breakfast", fr: "Petit déjeuner" },
      note: { en: "per person", nl: "per persoon", fr: "par personne" },
    },
    {
      id: "diner",
      price: 25,
      name: { nl: "Diner", en: "Dinner", fr: "Dîner" },
      note: { en: "per person", nl: "per persoon", fr: "par personne" },
    }
  ]

  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({})

  const total = extras.reduce((sum, e) => (selectedExtras[e.id] ? sum + e.price : sum), 0)
  return (
    <section className="py-12 sm:py-16 px-2 sm:px-4 bg-gradient-to-br from-green-100/60 to-green-50/30 dark:from-green-950/40 dark:to-green-900/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-green-600">{lang === "nl" ? "Alle extra's" : lang === "fr" ? "Tous les suppléments" : "All extras"}</h3>
          <ul className="space-y-3">
            {extras.map((e) => (
              <li key={e.id} className="flex items-center justify-between p-3 border rounded-md border-green-200 bg-green-100">
                <div>
                  <div className="font-medium text-green-900">{e.name[lang]}</div>
                  {e.note?.[lang] && <div className="text-sm text-green-800">{e.note[lang]}</div>}
                </div>
                <div className="text-sm text-green-700 flex items-center gap-1"><Euro size={14} /> {e.price}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

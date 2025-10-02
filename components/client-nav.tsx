"use client"

import { useEffect } from "react"
import { LanguageSelector } from "@/components/language-selector"

const navSections = [
  { id: "hero", label: { en: "Home", fr: "Accueil", nl: "Home" } },
  { id: "about", label: { en: "About", fr: "À propos", nl: "Over" } },
  { id: "amenities", label: { en: "Amenities", fr: "Équipements", nl: "Voorzieningen" } },
  { id: "pricing", label: { en: "Pricing", fr: "Tarifs", nl: "Prijzen" } },
  { id: "contact", label: { en: "Contact", fr: "Contact", nl: "Contact" } },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function ClientNav({ propertyName, lang }: { propertyName: string, lang: "en" | "fr" | "nl" }) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">{propertyName}</div>
        <nav className="flex gap-2">
          {navSections.map(section => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className="text-white px-3 py-1 rounded hover:bg-white/20 transition"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {section.label[lang]}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>
      </div>
    </header>
  )
}

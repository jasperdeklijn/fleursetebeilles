"use client"

import { useState, useEffect } from "react"
import { LanguageSelector } from "@/components/language-selector"
import { Menu, X } from "lucide-react" // icons for open/close

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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setMenuOpen(false) // close menu on click
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4 bg-transparent">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">{propertyName}</div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-2">
          {navSections.map(section => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleNavClick(section.id)}
              className="text-white px-3 py-1 rounded hover:bg-white/20 transition"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {section.label[lang]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSelector />

          {/* Mobile toggle button */}
          <button
            type="button"
            className="text-white md:hidden p-2 rounded hover:bg-white/20 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-black/80 backdrop-blur-md rounded-lg p-3 flex flex-col items-center space-y-2">
          {navSections.map(section => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleNavClick(section.id)}
              className="w-full text-white py-2 rounded hover:bg-white/20 transition"
            >
              {section.label[lang]}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
